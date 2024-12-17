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

def find_book_id(books, book_id):
    """Trouve un livre par son id."""
    for book in books:
        if book["id"] == book_id:
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
        "role": "USER",
        "borrowed_books": []
    }
    users.append(new_user)
    save_data(USERS_FILE, users)

    return jsonify({"message": f"Utilisateur '{name}' ajouté avec succès.", "user": new_user}), 201

@users_bp.route("/login", methods=["POST"])
def login():
    try:
        # Chargement des données utilisateurs
        users = load_data(USERS_FILE)

        # Récupération des données de la requête
        data = request.json
        name = data.get("name")

        # Validation de l'entrée
        if not name:
            return jsonify({"error": "Le nom est requis pour le login."}), 400

        # Recherche de l'utilisateur
        user = find_user_name(users, name)

        if not user:
            return jsonify({"error": "Utilisateur non trouvé."}), 404

        # Réponse avec succès
        return jsonify({"message": "Connexion réussie", "user": user}), 200

    except Exception as e:
        # Gestion globale des erreurs
        return jsonify({"error": f"Une erreur est survenue : {str(e)}"}), 500

@users_bp.route("/", methods=["GET"])
def get_users():
    users = load_data(USERS_FILE)
    return jsonify({"users": users}), 200

@users_bp.route("/borrow", methods=["POST"])
def borrow_book():
    try:
        # Chargement des données utilisateurs et livres
        users = load_data(USERS_FILE)
        books = load_data(BOOKS_FILE)

        # Récupération des données de la requête
        data = request.json
        user_id = data.get("user_id")
        book_id = data.get("book_id")

        # Validation de l'entrée
        if not user_id or not book_id:
            return jsonify({"error": "Veuillez fournir l'ID utilisateur et le titre du livre."}), 400

        # Recherche de l'utilisateur
        user = find_user(users, user_id)
        if not user:
            return jsonify({"error": "Utilisateur non trouvé."}), 404

        # Recherche du livre
        book = find_book_id(books, book_id)
        if not book:
            return jsonify({"error": "Livre non trouvé."}), 404

        # Vérification de la disponibilité du livre
        if not book.get("disponible", False) or book.get("exemplaire_restant", 0) <= 0:
            return jsonify({"error": "Livre non disponible."}), 400

        # Mise à jour des données
        user["borrowed_books"].append(book)
        book["exemplaire_restant"] -= 1
        book["disponible"] = book["exemplaire_restant"] > 0

        # Sauvegarde des données après modifications
        save_data(USERS_FILE, users)
        save_data(BOOKS_FILE, books)

        return jsonify({"message": f"Vous avez emprunté le livre '{book["titre"]}' avec succès."}), 200

    except Exception as e:
        # Gestion globale des erreurs
        return jsonify({"error": f"Une erreur est survenue : {str(e)}"}), 500



# Retourner un livre
@users_bp.route("/return", methods=["POST"])
def return_book():
    data = request.json
    user_id = data.get("user_id")
    book_id = data.get("book_id")

    if not user_id or not book_id:
        return jsonify({"error": "Veuillez fournir l'ID utilisateur et le titre du livre."}), 400

    users = load_data(USERS_FILE)
    books = load_data(BOOKS_FILE)

    user = find_user(users, user_id)
    book = find_book_id(books, book_id)
    if not user:
        return jsonify({"error": "Utilisateur non trouvé."}), 404
    
    if not book:
        return jsonify({"error": "Livre non trouvé."}), 404

    if book not in user["borrowed_books"]:
        return jsonify({"error": "Vous n'avez pas emprunté ce livre."}), 400


    user["borrowed_books"].remove(book)
    book["exemplaire_restant"] += 1
    book["disponible"] = True

    save_data(USERS_FILE, users)
    save_data(BOOKS_FILE, books)

    return jsonify({"message": f"Vous avez retourné le livre '{book["titre"]}' avec succès."}), 200

@users_bp.route("/borrowed/<int:user_id>", methods=["GET"])
def get_borrowed_books(user_id):
    try:
        # Chargement des données utilisateurs
        users = load_data(USERS_FILE)

        # Recherche de l'utilisateur
        user = find_user(users, user_id)

        if not user:
            return jsonify({"error": "Utilisateur non trouvé."}), 404

        # Réponse avec les livres empruntés
        return jsonify({"borrowed_books": user.get("borrowed_books", [])}), 200

    except Exception as e:
        # Gestion d'erreur générique
        return jsonify({"error": f"Une erreur est survenue : {str(e)}"}), 500

@users_bp.route("/<int:user_id>", methods=["DELETE"])
def delete_user(user_id):
    try:
        # Chargement des données utilisateurs
        users = load_data(USERS_FILE)

        # Recherche de l'utilisateur à supprimer
        user = find_user(users, user_id)
        if not user:
            return jsonify({"error": "Utilisateur non trouvé."}), 404

        # Suppression de l'utilisateur
        users.remove(user)

        # Sauvegarde des données après suppression
        save_data(USERS_FILE, users)

        return jsonify({"message": f"Utilisateur avec l'ID '{user_id}' supprimé avec succès."}), 200

    except Exception as e:
        # Gestion globale des erreurs
        return jsonify({"error": f"Une erreur est survenue : {str(e)}"}), 500
