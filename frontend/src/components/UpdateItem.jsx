import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const UpdateTask = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [task, setTask] = useState({});
    const [date, setDate] = useState('');
    const [status, setStatus] = useState('Pending');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const accessToken = localStorage.getItem("accessToken");

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/v1/items/get-item/${id}`, {
                    headers: {
                        Authorization: accessToken
                    }
                });
                const { data } = response.data;
                setTask(data);
                setDate(data.createdOn);
                setStatus(data.status);
            } catch (error) {
                console.error(error);
                setError('Failed to fetch task details. Please try again.');
            }
        };

        fetchTask();
    }, [id, accessToken]);

    const updateTask = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const response = await axios.patch(`http://localhost:8000/api/v1/items/update-item/${id}`, 
                { task: task.content, date, status },
                {
                    headers: {
                        Authorization: accessToken
                    }
                }
            );
            setSuccess('Task updated successfully!');
            setTimeout(() => navigate("/"), 2000);
        } catch (error) {
            console.error(error);
            setError('Failed to update task. Please try again.');
        }
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-100 p-4">
                <header className="bg-blue-600 p-4 text-white text-center">
                    <h1 className="text-3xl font-bold">Update Task</h1>
                </header>
                <main className="mt-6 max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
                    {error && <div className="text-red-500">{error}</div>}
                    {success && <div className="text-green-500">{success}</div>}
                    <form onSubmit={updateTask} className="space-y-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Task</label>
                            <input
                                type="text"
                                value={task.content || ''}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                readOnly
                            />
                        </div>
                        <div>
                            <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
                            <input
                                type="date"
                                id="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                            <select
                                id="status"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                required
                            >
                                <option value="Pending">Pending</option>
                                <option value="In Process">In Process</option>
                                <option value="Done">Done</option>
                            </select>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Update Task
                        </button>
                    </form>
                </main>
            </div>
        </>
    );
};

export default UpdateTask;
