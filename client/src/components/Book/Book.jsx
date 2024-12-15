const Book = ({ titre, auteur, annee, disponible }) => {
    return (
        <div className='flex flex-col justify-center items-start border-slate-300 border px-3 py-5 space-y-5 rounded-md'>
            <div className="flex justify-between items-center w-full">
                <h2 className='font-bold text-2xl text-slate-600'>{titre}</h2>
                <p className='text-md italic text-slate-400'>{annee}</p>
            </div>
            <p className="text-xl font-medium text-slate-500">Ecrit par {auteur}</p>
            {disponible ? 
                <button
                    className='self-center bg-slate-500 text-white px-4 py-2 rounded-md hover:bg-slate-700 transition'
                    onClick={() => onEdit(id)}
                >Emprunter</button> :
                <button
                    className='font-medium self-center bg-white text-red-600 px-4 py-2 '
                    onClick={() => onEdit(id)}
                >Hors stock</button>
            }
        </div>
    )
}

export default Book