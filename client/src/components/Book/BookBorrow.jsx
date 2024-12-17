import axios from "axios";
import useUserStore from "../../store/userStore";

const BookBorrow = ({ book }) => {
    const user = useUserStore((state) => state.user);

    const handleReturn = async (userId, book_id) => {
        try {
            // Préparer les données à envoyer
            const data = {
                user_id: userId,
                book_id,
            };

            // Envoyer une requête POST au backend
            const response = await axios.post("http://localhost:5000/users/return", data);

            // Vérifier la réponse
            if (response.status === 200) {
                alert(`Succès : ${response.data.message}`);
            } else {
                alert(`Erreur : ${response.data.error}`);
            }
        } catch (error) {
            // Gérer les erreurs (réseau ou serveur)
            console.error("Erreur lors de l'emprunt :", error);
            alert(`Erreur : ${error.response?.data.error || "Une erreur est survenue."}`);
        }
    };

    return (
        <div className='flex flex-col justify-center items-start border-slate-300 border px-3 py-5 space-y-5 rounded-md'>
            <div className="flex justify-between items-center w-full">
                <h2 className='font-bold text-2xl text-slate-600'>{book.titre}</h2>
                <p className='text-md italic text-slate-400'>{book.annee}</p>
            </div>
            <p className="text-xl font-medium text-slate-500">Ecrit par {book.auteur}</p>
            <button
                className='self-center bg-slate-500 text-white px-4 py-2 rounded-md hover:bg-slate-700 transition'
                onClick={() => handleReturn(user.user_id, book.id)}
            >Retourner</button>
        </div>
    )
}

export default BookBorrow