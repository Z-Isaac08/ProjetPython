from flask import Blueprint, jsonify, request
from utils.data_utils import load_data, save_data

USERS_FILE = "data/users.json"
BOOKS_FILE = "data/livres.json"

users_bp = Blueprint("users", __name__)

def find_user(users, user_id):
    for user in users:
        if user["user_id"] == user_id:
            return user
    return None

def find_user_name(users, name):
    for user in users:
        if user["name"].lower() == name.lower():
            return user
    return None

def find_book(books, titre):
    for book in books:
        if book["titre"].lower() == titre.lower():
            return book
    return None

@users_bp.route("/", methods=["POST"])
def add_user():
    users = load_data(USERS_FILE)

    data = request.json
    name = data.get("name")
    user_id = max(int(user["user_id"]) for user in users) + 1

    if not name or not user_id:
        return jsonify({"error": "Le nom est obligatoires."}), 400

    if find_user(users, user_id):
        return jsonify({"error": f"Un utilisateur avec l'ID '{user_id}' existe déjà."}), 400

    new_user = {
        "name": name,
        "user_id": user_id,
        "borrowed_books": []
    }
    users.append(new_user)
    save_data(USERS_FILE, users)

    return jsonify({"message": f"Utilisateur '{name}' ajouté avec succès.", "user": new_user}), 201


@users_bp.route("/", methods=["GET"])
def get_users():
    users = load_data(USERS_FILE)
    return jsonify({"Utilisateurs": users}), 200

@users_bp.route("/login", methods=["POST"])
def login():
    users = load_data(USERS_FILE)
    
    data = request.json
    name = data.get("name")

    user = find_user_name(users, name)
    return jsonify({"Utilisateur": user}), 200

@users_bp.route("/admin/<int:user_id>", methods=["GET"])
def check_role(user_id):
    users = load_data(USERS_FILE)
    user = find_user(users, user_id)
    if user["role"] == "ADMIN" :
        return jsonify({"ADMIN": user}), 200
    else : 
        return jsonify({"error": "Vous n'êtes pas un admin"}), 400

@users_bp.route("/borrow", methods=["POST"])
def borrow_book():
    users = load_data(USERS_FILE)
    books = load_data(BOOKS_FILE)

    data = request.json
    user_id = data.get("user_id")
    titre = data.get("titre")

    if not user_id or not titre:
        return jsonify({"error": "Veuillez fournir l'ID utilisateur et le titre du livre."}), 400

    user = find_user(users, user_id)
    if not user:
        return jsonify({"error": "Utilisateur non trouvé."}), 404

    book = find_book(books, titre)
    if not book:
        return jsonify({"error": "Livre non trouvé."}), 404

    if not book["disponible"] or book["exemplaire_restant"] == 0:
        return jsonify({"error": "Livre non disponible."}), 400

    user["borrowed_books"].append(titre)
    book["exemplaire_restant"] -= 1
    book["disponible"] = book["exemplaire_restant"] > 0

    save_data(USERS_FILE, users)
    save_data(BOOKS_FILE, books)

    return jsonify({"message": f"Vous avez emprunté le livre '{titre}' avec succès."}), 200


# Retourner un livre
@users_bp.route("/return", methods=["POST"])
def return_book():
    data = request.json
    user_id = data.get("user_id")
    titre = data.get("titre")

    if not user_id or not titre:
        return jsonify({"error": "Veuillez fournir l'ID utilisateur et le titre du livre."}), 400

    users = load_data(USERS_FILE)
    books = load_data(BOOKS_FILE)

    user = find_user(users, user_id)
    if not user:
        return jsonify({"error": "Utilisateur non trouvé."}), 404

    if titre not in user["borrowed_books"]:
        return jsonify({"error": "Vous n'avez pas emprunté ce livre."}), 400

    book = find_book(books, titre)
    if not book:
        return jsonify({"error": "Livre non trouvé."}), 404

    user["borrowed_books"].remove(titre)
    book["exemplaire_restant"] += 1
    book["disponible"] = True

    save_data(USERS_FILE, users)
    save_data(BOOKS_FILE, books)

    return jsonify({"message": f"Vous avez retourné le livre '{titre}' avec succès."}), 200
