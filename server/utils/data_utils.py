import json
import os


USERS_FILE = "data/users.json"
BOOKS_FILE = "data/livres.json"

def load_data(file_name):
    try:
        with open(file_name, "r") as f:
            return json.load(f)
    except FileNotFoundError:
        return []

def save_data(file_name, data):
    with open(file_name, "w") as f:
        json.dump(data, f, indent=4, ensure_ascii=False)


def get_next_user_id():
    """Récupère l'ID suivant pour un nouvel utilisateur."""
    if not os.path.exists(USERS_FILE):
        return 1 

    with open(USERS_FILE, "r") as file:
        try:
            users = json.load(file)
            if users:
                return max(int(user["user_id"]) for user in users) + 1
            else:
                return 1
        except json.JSONDecodeError:
            return 1


def get_next_book_id():
    """Récupère l'ID suivant pour un nouveau livre."""
    if not os.path.exists(BOOKS_FILE):
        return 1

    with open(BOOKS_FILE, "r") as file:
        try:
            books = json.load(file)
            if books:
                return max(int(book["id"]) for book in books) + 1
            else:
                return 1
        except json.JSONDecodeError:
            return 1
