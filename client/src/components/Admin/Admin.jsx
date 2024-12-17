import React, { useEffect, useState } from 'react';
import SidebarAdmin from '../Sidebar/SidebarAdmin';
import axios from 'axios';

const Admin = () => {
    const [name, setName] = useState("");
    const [books, setBooks] = useState([]);
    const [users, setUsers] = useState([]);
    const [showUserForm, setShowUserForm] = useState(false);
    const [showBookForm, setShowBookForm] = useState(false);

    // États pour le formulaire de livres
    const [bookTitle, setBookTitle] = useState("");
    const [bookAuthor, setBookAuthor] = useState("");
    const [bookYear, setBookYear] = useState("");
    const [bookNum, setBookNum] = useState("");

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get("http://localhost:5000/books/");
                setBooks(response.data.books);
            } catch (error) {
                console.error("Erreur lors de la récupération des livres", error);
            }
        };
        const fetchUsers = async () => {
            try {
                const response = await axios.get("http://localhost:5000/users/");
                setUsers(response.data.users);
            } catch (error) {
                console.error("Erreur lors de la récupération des utilisateurs", error);
            }
        };
        fetchUsers();
        fetchBooks();
    }, []);

    const handleAddUser = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/users/", { name });
            setUsers([...users, response.data.user]);
            setName("");
            setShowUserForm(false);
            alert("Utilisateur ajouté avec succès !");
        } catch (error) {
            console.error("Erreur lors de l'ajout de l'utilisateur :", error);
            alert("Échec de l'ajout de l'utilisateur. Veuillez réessayer.");
        }
    };
    
    const handleDeleteUser = async (userId) => {
        try {
            await axios.delete(`http://localhost:5000/users/${userId}`);
            alert("Utilisateur supprimé avec succès !");
        } catch (error) {
            console.error("Erreur lors de la suppression de l'utilisateur :", error);
            alert("Échec de la suppression de l'utilisateur. Veuillez réessayer.");
        }
    };
    
    const handleAddBook = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/books/", {
                titre: bookTitle,
                auteur: bookAuthor,
                annee: parseInt(bookYear),
                exemplaire: parseInt(bookNum),
            });
            setBooks([...books, response.data.book]);
            setBookTitle("");
            setBookAuthor("");
            setBookYear("");
            setBookNum("");
            setShowBookForm(false);
            alert("Livre ajouté avec succès !");
        } catch (error) {
            console.error("Erreur lors de l'ajout du livre :", error);
            alert("Échec de l'ajout du livre. Veuillez réessayer.");
        }
    };
    

    return (
        <div className="flex">
            <SidebarAdmin />

            <div className="ml-64 p-6 flex-1 bg-gray-50">
                <h1 className="text-3xl text-slate-600 font-bold mb-6">Interface Administrateur</h1>

                <div className="mb-4 flex space-x-4">
                    <button
                        className="px-4 py-2 bg-slate-500 text-white rounded hover:bg-slate-600 focus:outline-none"
                        onClick={() => setShowUserForm(true)}
                    >
                        Ajouter Utilisateur
                    </button>
                    <button
                        className="px-4 py-2 bg-slate-500 text-white rounded hover:bg-slate-600 focus:outline-none"
                        onClick={() => setShowBookForm(true)}
                    >
                        Ajouter Livre
                    </button>
                </div>

                {/* Liste des utilisateurs */}
                <div className="overflow-auto bg-white border rounded-lg mb-6 shadow-md p-4">
                    <h2 className="text-lg font-bold mb-2">Liste des Utilisateurs</h2>
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-200 text-gray-700">
                                <th className="border px-4 py-2">ID</th>
                                <th className="border px-4 py-2">Nom</th>
                                <th className="border px-4 py-2">Rôle</th>
                                <th className="border px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.user_id} className="hover:bg-gray-100">
                                    <td className="border px-4 py-2">{user.user_id}</td>
                                    <td className="border px-4 py-2">{user.name}</td>
                                    <td className="border px-4 py-2">{user.role}</td>
                                    <td className="border px-4 py-2">
                                        <button
                                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                            onClick={() => handleDeleteUser(user.user_id)}
                                        >
                                            Supprimer
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Liste des livres */}
                <div className="overflow-auto bg-white border rounded-lg shadow-md p-4">
                    <h2 className="text-lg font-bold mb-2">Liste des Livres</h2>
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-200 text-gray-700">
                                <th className="border px-4 py-2">ID</th>
                                <th className="border px-4 py-2">Titre</th>
                                <th className="border px-4 py-2">Auteur</th>
                                <th className="border px-4 py-2">Année</th>
                                <th className="border px-4 py-2">Disponible</th>
                            </tr>
                        </thead>
                        <tbody>
                            {books.map(book => (
                                <tr key={book.id} className="hover:bg-gray-100">
                                    <td className="border px-4 py-2">{book.id}</td>
                                    <td className="border px-4 py-2">{book.titre}</td>
                                    <td className="border px-4 py-2">{book.auteur}</td>
                                    <td className="border px-4 py-2">{book.annee}</td>
                                    <td className="border px-4 py-2">{book.disponible ? "Oui" : "Non"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Formulaire ajout utilisateur */}
            {showUserForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-lg mb-2 font-bold">Ajouter un Utilisateur</h2>
                        <input
                            className="border p-2 mb-2 w-full"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Nom"
                        />
                        <button
                            className="bg-slate-500 text-white px-4 py-2 rounded hover:bg-slate-600"
                            onClick={handleAddUser}
                        >
                            Ajouter
                        </button>
                        <button
                            className="ml-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                            onClick={() => setShowUserForm(false)}
                        >
                            Annuler
                        </button>
                    </div>
                </div>
            )}

            {/* Formulaire ajout livre */}
            {showBookForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-lg mb-2 font-bold">Ajouter un Livre</h2>
                        <input
                            className="border p-2 mb-2 w-full"
                            value={bookTitle}
                            onChange={(e) => setBookTitle(e.target.value)}
                            placeholder="Titre"
                        />
                        <input
                            className="border p-2 mb-2 w-full"
                            value={bookAuthor}
                            onChange={(e) => setBookAuthor(e.target.value)}
                            placeholder="Auteur"
                        />
                        <input
                            className="border p-2 mb-2 w-full"
                            value={bookYear}
                            onChange={(e) => setBookYear(e.target.value)}
                            placeholder="Année"
                            type="number"
                        />
                        <input
                            className="border p-2 mb-2 w-full"
                            value={bookNum}
                            onChange={(e) => setBookNum(e.target.value)}
                            placeholder="Exemplaire"
                            type='number'
                        />
                        <button
                            className="bg-slate-500 text-white px-4 py-2 rounded hover:bg-slate-600"
                            onClick={handleAddBook}
                        >
                            Ajouter
                        </button>
                        <button
                            className="ml-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                            onClick={() => setShowBookForm(false)}
                        >
                            Annuler
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Admin;
