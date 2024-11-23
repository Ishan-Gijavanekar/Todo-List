import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import { Link } from 'react-router-dom';

const HomePage = () => {
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState('');
    const [date, setDate] = useState('');
    const [status, setStatus] = useState('Pending');
    const [editTaskId, setEditTaskId] = useState(null); // Track task being edited
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const accessToken = localStorage.getItem("accessToken");

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/v1/items/get-items", {
                    headers: {
                        Authorization: accessToken
                    }
                });
                setTasks(response.data.data);
            } catch (error) {
                console.error(error);
                setError('Failed to fetch tasks. Please try again.');
            }
        };

        fetchTasks();
    }, [accessToken]);

    const addTask = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (task.trim() && date.trim()) {
            if (editTaskId) {
                // Update existing task
                try {
                    const response = await axios.patch(`http://localhost:8000/api/v1/items/update-item/${editTaskId}`, 
                        { task, date, status },
                        {
                            headers: {
                                Authorization: accessToken
                            }
                        }
                    );
                    const updatedTasks = tasks.map(t => t._id === editTaskId ? response.data.data : t);
                    setTasks(updatedTasks);
                    setTask('');
                    setDate('');
                    setStatus('Pending');
                    setEditTaskId(null);
                    setSuccess('Task updated successfully!');
                } catch (error) {
                    console.error(error);
                    setError('Failed to update task. Please try again.');
                }
            } else {
                // Add new task
                try {
                    const response = await axios.post("http://localhost:8000/api/v1/items/add-items", 
                        { task, date, status },
                        {
                            headers: {
                                Authorization: accessToken
                            }
                        }
                    );
                    setTasks([...tasks, response.data.data]);
                    setTask('');
                    setDate('');
                    setStatus('Pending');
                    setSuccess('Task added successfully!');
                } catch (error) {
                    console.error(error);
                    setError('Failed to add task. Please try again.');
                }
            }
        } else {
            setError('All fields are required.');
        }
    };

    const editTask = (task) => {
        setTask(task.content);
        setDate(task.createdOn);
        setStatus(task.status);
        setEditTaskId(task._id);
    };

    const deleteTask = async (taskId) => {
        try {
            await axios.delete(`http://localhost:8000/api/v1/items/delete-item/${taskId}`, {
                headers: {
                    Authorization: accessToken
                }
            });
            setTasks(tasks.filter(task => task._id !== taskId));
            setSuccess('Task deleted successfully!');
        } catch (error) {
            console.error(error);
            setError('Failed to delete task. Please try again.');
        }
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-100 p-4">
                <header className="bg-blue-600 p-4 text-white text-center">
                    <h1 className="text-3xl font-bold">Todo List</h1>
                </header>
                <main className="mt-6 max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
                    <form onSubmit={addTask} className="space-y-4 mb-4">
                        {error && <div className="text-red-500">{error}</div>}
                        {success && <div className="text-green-500">{success}</div>}
                        <div className="flex">
                            <input
                                type="text"
                                value={task}
                                onChange={(e) => setTask(e.target.value)}
                                className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-600 mr-2"
                                placeholder="Add a new task"
                                required
                            />
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                                required
                            />
                        </div>
                        <div>
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                            >
                                <option value="Pending">Pending</option>
                                <option value="In Process">In Process</option>
                                <option value="Done">Done</option>
                            </select>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition duration-200"
                        >
                            {editTaskId ? 'Update Task' : 'Add Task'}
                        </button>
                    </form>
                    <ul>
                        {tasks.map((task, index) => (
                            <li key={index} className="bg-gray-200 p-2 my-2 rounded-md flex justify-between items-center">
                                <div>
                                    <p className="font-bold">{task.content}</p>
                                    <p className="text-sm">Due: {task.createdOn}</p>
                                    <p className="text-sm">Status: {task.status}</p>
                                </div>
                                <div className="flex space-x-2">
                                    <Link to={`/update-item/${task._id}`} className="bg-yellow-500 text-white p-1 rounded-md hover:bg-yellow-600">
                                        Update
                                    </Link>
                                    <button 
                                        onClick={() => deleteTask(task._id)} 
                                        className="bg-red-500 text-white p-1 rounded-md hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </main>
            </div>
        </>
    );
};

export default HomePage;
