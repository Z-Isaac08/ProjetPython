import {create} from "zustand";

const useUserStore = create((set) => ({
    user: JSON.parse(localStorage.getItem("user")) || null, // Charger depuis localStorage
    setUser: (user) => set(() => ({ user })),
    logout: () => {
        localStorage.removeItem("user"); // Supprimer du localStorage
        set(() => ({ user: null }));
    },
}));

export default useUserStore;
