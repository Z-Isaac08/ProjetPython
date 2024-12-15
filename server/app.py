from flask import Flask
from flask_cors import CORS  # Import de flask_cors
from routes.books import books_bp
from routes.users import users_bp

app = Flask(__name__)

# Ajout de CORS à l'application entière
CORS(app)

# Enregistrement des Blueprints
app.register_blueprint(books_bp, url_prefix="/books")
app.register_blueprint(users_bp, url_prefix="/users")

@app.route('/')  # Route pour la page d'accueil
def home():
    return "Hello, Flask!"  # Réponse simple


if __name__ == '__main__':
    app.run(debug=True)
