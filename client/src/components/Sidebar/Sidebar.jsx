import React from 'react';
import { NavLink, useNavigate } from 'react-router';
import useUserStore from '../../store/userStore';

const Sidebar = () => {
    const user = useUserStore((state) => state.user);
    const navigate = useNavigate();

    function getFirstLetter(str) {
        if (str && str.length > 0) {
            return str[0];
        }
        return '';
    }

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <div className="bg-slate-800 h-screen w-64 px-4 py-6 text-white fixed">
            <h2 className="text-2xl font-bold mb-6">Menu</h2>
            <div className="text-3xl flex items-center justify-center font-bold mb-6">
                <div className="text-3xl font-bold p-12 rounded-full bg-blue-900">{getFirstLetter(user.name)}</div>
            </div>
            <ul className="space-y-4">
                <li>
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive
                                ? "text-gray-200 font-bold border-l-4 border-white pl-2"
                                : "hover:text-gray-400"
                        }
                    >
                        Accueil
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/borrow"
                        className={({ isActive }) =>
                            isActive
                                ? "text-gray-200 font-bold border-l-4 border-white-500 pl-2"
                                : "hover:text-gray-400"
                        }
                    >
                        Mes emprunts
                    </NavLink>
                </li>
                <li>
                    <button
                        onClick={handleLogout}
                        className="text-gray-200 font-bold border-l-4 border-red-500 pl-2 hover:text-gray-400"
                    >
                        Déconnexion
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
