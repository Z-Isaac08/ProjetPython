import React from 'react';
import { NavLink } from 'react-router';

const SidebarAdmin = () => {
    return (
        <div className="bg-slate-800 h-screen w-64 px-4 py-6 text-white fixed">
            <h2 className="text-2xl font-bold mb-6">Menu</h2>
            <div className="text-3xl flex items-center justify-center font-bold mb-6">
                <div className="text-3xl font-bold p-12 rounded-full bg-blue-900">A</div>
            </div>
            <ul className="space-y-4">
                <li>
                    <NavLink
                        to="/admin"
                        className={({ isActive }) =>
                            isActive
                                ? "text-gray-200 font-bold border-l-4 border-white pl-2"
                                : "hover:text-gray-400"
                        }
                    >
                        Accueil
                    </NavLink>
                </li>
            </ul>
        </div>
    );
};

export default SidebarAdmin;
