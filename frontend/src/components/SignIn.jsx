import React, { useState } from 'react';
import Navbar from './Navbar';
import axios from 'axios'

const SignIn = () => {
    const [values, setValues] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const change = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    const handleSignIn = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        
        try {
            try {
                const response = await axios.post('http://localhost:8000/api/v1/users/login', values, {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
            
                const { loggedInUser, accessToken, refreshToken } = response.data.data;

                console.log(response)
            
                // Store tokens in localStorage or cookies
                localStorage.setItem('accessToken', `Bearer ${accessToken}`);
                localStorage.setItem('refreshToken', refreshToken);
            
                setSuccess('Logged in successfully!');
            } catch (error) {
                if (error.response && error.response.data) {
                    const { message } = error.response.data;
                    throw new Error(message);
                } else {
                    throw new Error('Something went wrong. Please try again.');
                }
            }
            
        } catch (error) {
            setError(error.message || 'Something went wrong. Please try again.');
        }
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                    <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
                    <form onSubmit={handleSignIn} className="space-y-6">
                        {error && <div className="text-red-500">{error}</div>}
                        {success && <div className="text-green-500">{success}</div>}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={values.email}
                                onChange={change}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={values.password}
                                onChange={change}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Sign In
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default SignIn;
