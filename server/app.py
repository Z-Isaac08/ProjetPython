from flask import Flask
from flask_cors import CORS
from routes.books import books_bp
from routes.users import users_bp

app = Flask(__name__)

# Configuration globale pour CORS
CORS(app, resources={r"/books/*": {"origins": "http://localhost:5173"}, 
                    r"/users/*": {"origins": "http://localhost:5173"}}, 
    supports_credentials=True)

# Enregistrement des Blueprints
app.register_blueprint(books_bp, url_prefix="/books")
app.register_blueprint(users_bp, url_prefix="/users")

@app.route('/')
def home():
    return "Hello, Flask!"

if __name__ == '__main__':
    app.run(debug=True)
