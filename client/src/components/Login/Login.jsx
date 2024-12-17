import React, { useState } from 'react';
import axios from "axios"
import useUserStore from '../../store/userStore';
import { useNavigate } from 'react-router';

const Login = () => {
    const [name, setName] = useState("")
    const setUser = useUserStore((state) => state.setUser);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/users/login", {
                name
            });
            console.log('Réponse du serveur :', response.data.user);
    
            if (response.data.user) {
                setUser(response.data.user);
                localStorage.setItem("user", JSON.stringify(response.data.user)); // Mise à jour de l'utilisateur dans le store Zustand
                alert(`Succès : ${response.data.message}`);
                navigate("/"); // Redirection vers Home
            }
            setName(""); // Réinitialisation du champ de saisie
        } catch (error) {
            alert(`Erreur : ${error.response?.data.error || "Une erreur est survenue."}`);
            console.error("Erreur lors de la connexion :", error);
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