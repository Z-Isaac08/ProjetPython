from flask import Blueprint, jsonify, request
from utils.data_utils import load_data, save_data

USERS_FILE = "data/users.json"
BOOKS_FILE = "data/livres.json"

books_bp = Blueprint("books", __name__)


def find_book(books, titre):
    """Trouve un livre par titre."""
    for book in books:
        if book["titre"].lower() == titre.lower():
            return book
    return None

def find_book_id(books, book_id):
    """Trouve un livre par son id."""
    for book in books:
        if book["id"] == book_id:
            return book
    return None


# 🚀 Route pour **Create**
@books_bp.route("/", methods=["POST"])
def add_book():
    books = load_data(BOOKS_FILE)

    data = request.json
    book_id = max(int(book["id"]) for book in books) + 1
    titre = data.get("titre")
    auteur = data.get("auteur")
    annee = data.get("annee")
    exemplaire = data.get("exemplaire")

    if not titre or not auteur or not annee or not exemplaire:
        return jsonify({"error": "Les champs titre, auteur, annee et exemplaire sont obligatoires."}), 400

    if find_book(books, titre):
        return jsonify({"error": f"Un livre avec le titre '{titre}' existe déjà."}), 400

    new_book = {
        "id": book_id,
        "titre": titre,
        "auteur": auteur,
        "annee": int(annee),
        "total_exemplaire": int(exemplaire),
        "exemplaire_restant": int(exemplaire),
        "disponible": False
    }
    books.append(new_book)
    save_data(BOOKS_FILE, books)

    return jsonify({"message": f"Le livre '{titre}' ajouté avec succès.", "book": new_book}), 201


# 🚀 Route pour **Read** - Obtenir tous les livres
@books_bp.route("/", methods=["GET"])
def get_books():
    books = load_data(BOOKS_FILE)
    return jsonify({"books": books}), 200

@books_bp.route("/available", methods=["GET"])
def get_available_books():
    books = load_data(BOOKS_FILE)
    available_book = [book for book in books if book["exemplaire_restant"] > 0]
    return jsonify({"books": available_book}), 200

@books_bp.route("/borrowed", methods=["GET"])
def get_borrowed_books():
    books = load_data(BOOKS_FILE)
    borrowed_books = [book for book in books if book["total_exemplaire"] != book["exemplaire_restant"]]
    return jsonify({"books": borrowed_books}), 200

# 🚀 Route pour **Read** - Rechercher un livre par titre ou auteur
@books_bp.route("/rechercher", methods=["GET"])
def search_books():
    mot_cle = request.args.get("mot_cle")
    books = load_data(BOOKS_FILE)

    results = [
        book for book in books
        if mot_cle.lower() in book["titre"].lower() or mot_cle.lower() in book["auteur"].lower()
    ]
    return jsonify({"results": results}), 200


# 🚀 Route pour **Update** - Mettre à jour un livre
@books_bp.route("/<int:book_id>", methods=["PUT"])
def update_book(book_id):
    data = request.json
    books = load_data(BOOKS_FILE)

    book = find_book_id(books, book_id)
    if not book:
        return jsonify({"error": f"Le livre '{book["titre"]}' n'existe pas."}), 404

    # Mettre à jour les valeurs
    book["titre"] = data.get("titre", book["titre"])
    book["auteur"] = data.get("auteur", book["auteur"])
    book["annee"] = data.get("annee", book["annee"])
    book["total_exemplaire"] = data.get("total_exemplaire", book["total_exemplaire"])
    book["exemplaire_restant"] = book["total_exemplaire"]  # Reset en fonction des changements

    save_data(BOOKS_FILE, books)

    return jsonify({"message": f"Le livre '{book["titre"]}' a été mis à jour avec succès.", "book": book}), 200


# 🚀 Route pour **Delete** - Supprimer un livre
@books_bp.route("/<int:book_id>", methods=["DELETE"])
def delete_book(book_id):
    books = load_data(BOOKS_FILE)
    book_to_delete = find_book_id(books, book_id)

    if not book_to_delete:
        return jsonify({"error": f"Le livre '{book_to_delete["titre"]}' n'existe pas."}), 404

    books = [book for book in books if book["id"] != book_id]
    save_data(BOOKS_FILE, books)

    return jsonify({"message": f"Le livre '{book_to_delete["titre"]}' a été supprimé avec succès."}), 200
