import React, { useState } from 'react'

const Login = () => {
    const [name, setName] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("Utilisateur ajouté :", { name });
            setName("");
        } catch (error) {
            console.error("Erreur lors de l'ajout du post :", error);
        }
    };


    return (
        <div className='flex flex-col items-center justify-center space-y-4 border border-slate-700 w-max m-auto p-6 rounded-md '>
            <h1 className='text-3xl font-semibold text-slate-700'>Bienvenue à la biblioFarm</h1>
            <p className='text-md text-slate-400'>Entrez votre nom d'utilisateur afin d'accéder à la bibliothèque</p>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={name} // Liaison avec l'état
                    onChange={(e) => setName(e.target.value)} // Mise à jour de l'état
                    className="w-72 mx-2.5 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 "
                    placeholder="Nom d'utilisateur"
                />
                <button
                    type="submit"
                    className="px-4 py-2 text-white bg-slate-500 rounded-md hover:bg-slate-700"
                >
                    Se connecter
                </button>
            </form>
        </div>
    )
}

export default Login