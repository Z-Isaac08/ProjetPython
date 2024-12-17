import React, { useEffect, useState } from 'react';
import axios from "axios";
import Sidebar from '../Sidebar/Sidebar';
import Book from '../Book/Book';
import useUserStore from '../../store/userStore';

const Home = () => {
    const [books, setBooks] = useState([]); // État pour stocker les livres
    const [searchQuery, setSearchQuery] = useState(""); // État pour suivre la saisie dans l'input
    const [error, setError] = useState(""); // État pour gérer les erreurs
    const user = useUserStore((state) => state.user);

    // Fonction pour récupérer tous les livres (état normal)
    const fetchBooks = async () => {
        try {
            const response = await axios.get("http://localhost:5000/books/");
            setBooks(response.data.books);
        } catch (error) {
            console.error("Erreur lors de la récupération des données", error);
        }
    };

    // Récupérer tous les livres au chargement initial
    useEffect(() => {
        fetchBooks();
    }, []);

    // Fonction pour gérer la recherche
    const handleSearch = async () => {
        try {
            if (searchQuery.trim() === "") {
                // Si la barre de recherche est vide, réinitialiser la liste
                fetchBooks();
                return;
            }

            setError(""); // Réinitialiser l'erreur avant de lancer la requête
            const response = await axios.get("http://localhost:5000/books/search", {
                params: { mot_cle: searchQuery },
            });
            setBooks(response.data.results);
        } catch (error) {
            console.error("Erreur lors de la recherche :", error);
            setError("Une erreur est survenue lors de la recherche.");
        }
    };

    return (
        <div className="flex">
            {/* Sidebar visible uniquement sur la page Home */}
            <Sidebar />

            {/* Contenu principal de Home */}
            <div className="ml-64 p-4 flex-1">
                <h1 className="text-3xl text-slate-600 font-bold mb-4">Bienvenue {user.name}!</h1>
                
                {/* Barre de recherche */}
                <div className="flex items-center space-x-2 p-4">
                    <input
                        type="text"
                        placeholder="Rechercher..."
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-400"
                        value={searchQuery} // Lier l'état de l'input avec la valeur
                        onChange={(e) => setSearchQuery(e.target.value)} // Mettre à jour l'état lors de la saisie
                    />
                    <button
                        type="button"
                        className="px-4 py-2 bg-slate-500 text-white rounded-md hover:bg-slate-600 focus:ring-2 focus:ring-slate-400"
                        onClick={handleSearch} // Déclencher la recherche
                    >
                        Chercher
                    </button>
                </div>

                {/* Affichage de l'erreur si elle existe */}
                {error && <p className="text-red-500">{error}</p>}

                {/* Afficher la liste de livres */}
                <div className="grid grid-cols-4 gap-6 mt-6">
                    {books.length > 0 ? (
                        books.map(book => (
                            <Book key={book.id} book={book} />
                        ))
                    ) : (
                        <p className="text-gray-500">Aucun livre trouvé.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;
