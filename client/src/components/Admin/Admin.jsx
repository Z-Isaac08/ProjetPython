import React, { useState } from 'react';
import SidebarAdmin from '../Sidebar/SidebarAdmin';

const Admin = () => {
    const [users, setUsers] = useState([
        { id: 1, name: "Alice" },
        { id: 2, name: "Bob" },
        { id: 3, name: "Charlie" },
    ]);

    const [books, setBooks] = useState([
        { id: 1, title: "Livre 1", author: "Auteur 1", year: 2020, available: true },
        { id: 2, title: "Livre 2", author: "Auteur 2", year: 2018, available: false },
    ]);

    const [showUserForm, setShowUserForm] = useState(false);
    const [showBookForm, setShowBookForm] = useState(false);

    const handleAddUser = (name) => {
        const newUser = { id: Date.now(), name };
        setUsers([...users, newUser]);
        setShowUserForm(false);
    };

    const handleAddBook = (title, author, year) => {
        const newBook = { id: Date.now(), title, author, year, available: true };
        setBooks([...books, newBook]);
        setShowBookForm(false);
    };

    return (
        <div className="flex">
            {/* Sidebar visible uniquement sur la page Admin */}
            <SidebarAdmin />

            {/* Contenu principal de la section Admin */}
            <div className="ml-64 p-6 flex-1 bg-gray-50">
                <h1 className="text-3xl text-slate-600 font-bold mb-6">Interface Administrateur</h1>

                {/* Boutons pour gérer les utilisateurs et livres */}
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

                {/* Tableau des utilisateurs */}
                <div className="overflow-auto bg-white border rounded-lg mb-6 shadow-md p-4">
                    <h2 className="text-lg font-bold mb-2">Liste des Utilisateurs</h2>
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-200 text-gray-700">
                                <th className="border px-4 py-2">ID</th>
                                <th className="border px-4 py-2">Nom</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id} className="hover:bg-gray-100">
                                    <td className="border px-4 py-2">{user.id}</td>
                                    <td className="border px-4 py-2">{user.name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Tableau des livres */}
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
                                    <td className="border px-4 py-2">{book.title}</td>
                                    <td className="border px-4 py-2">{book.author}</td>
                                    <td className="border px-4 py-2">{book.year}</td>
                                    <td className="border px-4 py-2">{book.available ? "Oui" : "Non"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pop-up pour ajouter un utilisateur */}
            {showUserForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-lg mb-2 font-bold">Ajouter un Utilisateur</h2>
                        <input className="border p-2 mb-2 w-full" placeholder="Nom" id="userName" />
                        <button
                            className="bg-slate-500 text-white px-4 py-2 rounded hover:bg-slate-600"
                            onClick={() => handleAddUser(document.getElementById('userName').value)}
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

            {/* Pop-up pour ajouter un livre */}
            {showBookForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-lg mb-2 font-bold">Ajouter un Livre</h2>
                        <input className="border p-2 mb-2 w-full" placeholder="Titre" id="bookTitle" />
                        <input className="border p-2 mb-2 w-full" placeholder="Auteur" id="bookAuthor" />
                        <input className="border p-2 mb-2 w-full" placeholder="Année" id="bookYear" />
                        <button
                            className="bg-slate-500 text-white px-4 py-2 rounded hover:bg-slate-600"
                            onClick={() => handleAddBook(
                                document.getElementById('bookTitle').value,
                                document.getElementById('bookAuthor').value,
                                parseInt(document.getElementById('bookYear').value)
                            )}
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
