import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Briefcase } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-white shadow-md p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold text-blue-600 flex items-center gap-2">
                    <Briefcase size={28} />
                    JobPortal
                </Link>
                <div className="flex gap-4 items-center">
                    <Link to="/" className="text-gray-600 hover:text-blue-600">Home</Link>
                    {user ? (
                        <>
                            <Link to="/dashboard" className="text-gray-600 hover:text-blue-600">Dashboard</Link>
                            <span className="text-gray-400">|</span>
                            <span className="font-semibold text-gray-700">{user.name}</span>
                            <button 
                                onClick={handleLogout} 
                                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="text-gray-600 hover:text-blue-600">Login</Link>
                            <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">Register</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
