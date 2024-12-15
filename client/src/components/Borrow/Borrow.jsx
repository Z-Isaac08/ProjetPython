import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Book from '../Book/Book';

const Borrow = () => {
    return (
        <div className="flex">
            {/* Sidebar visible uniquement sur la page Borrow */}
            <Sidebar />

            {/* Contenu principal de Borrow */}
            <div className="ml-64 p-4 flex-1">
                <h1 className="text-3xl text-slate-600 font-bold mb-4">Mes emprunts</h1>
                <div className="flex items-center space-x-2 p-4">
                    <input
                        type="text"
                        placeholder="Rechercher..."
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-400"
                    />
                    <button
                        type="button"
                        className="px-4 py-2 bg-slate-500 text-white rounded-md hover:bg-slate-600 focus:ring-2 focus:ring-slate-400"
                    >
                        Chercher
                    </button>
                </div>
                <div className="grid grid-cols-4 gap-6 mt-6">
                    <Book titre={"Xa"} auteur={"Jules"} annee={2020} disponible={false} />
                </div>
            </div>
        </div>
    );
};

export default Borrow;
