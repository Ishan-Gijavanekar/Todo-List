import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear tokens from localStorage or cookies
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        navigate('/signin'); // Redirect to sign-in page
    };

    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white text-2xl font-bold">
                    <a href="/">TodoList</a>
                </div>
                <div className="md:hidden">
                    <button id="navbar-toggle" className="text-white focus:outline-none">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                        </svg>
                    </button>
                </div>
                <div className="hidden md:flex md:items-center">
                    <a href="/" className="text-white px-3 py-2 rounded-md text-sm font-medium">Home</a>
                    <a href="/signin" className="text-white px-3 py-2 rounded-md text-sm font-medium">Sign In</a>
                    <a href="/signup" className="text-white px-3 py-2 rounded-md text-sm font-medium">Sign Up</a>
                    <button onClick={handleLogout} className="text-white px-3 py-2 rounded-md text-sm font-medium bg-red-600 hover:bg-red-700 transition duration-200 ml-2">
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
