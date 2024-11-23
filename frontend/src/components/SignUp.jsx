import React, { useState } from 'react';
import Navbar from './Navbar';
import axios from 'axios'

const SignUp = () => {
    const [Values, setValues] = useState({
        username: "",
        password: "",
        email: "",
        address: ""
    })

    const change = (e) => {
        const {name, value} = e.target
        setValues({...Values,[name]:value})
    }

    const handleSignUp = async() => {
        try {
            if(Values.address === "" || Values.email === "" || Values.username === "" || Values.password === "") {
                alert("All feilds are required")
            }else {
                const response = await axios.post("http://localhost:8000/api/v1/users/register", Values)
                alert(response.data.message)
            }
        } catch (error) {
            console.log(error)
            alert("Register Failed")
        }
    };

    return (
        <><Navbar/>
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
                <div className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={Values.email}
                            name='email'
                            onChange={change}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={Values.username}
                            name='username'
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
                            value={Values.password}
                            name='password'
                            onChange={change}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                        <input
                            type="text"
                            id="address"
                            name='address'
                            value={Values.address}
                            onChange={change}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            required
                        />
                    </div>
                    <button
                        onClick={handleSignUp}
                        className="w-full bg-blue-600 text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Sign Up
                    </button>
                </div>
            </div>
        </div>
        </>
    );
};

export default SignUp;
