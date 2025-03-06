import React, { createContext, useState, useEffect } from 'react';
import { getTask, getTasks, storeTask, updateTaskItem, removeTask } from '../services/api';

const TaskContext = createContext();

const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);
    const [currentTask, setCurrentTask] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchTasks = async () => {
        try {
            const response = await getTasks();
            setTasks(response);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchTask = async (id) => {
        try {
            const response = await getTask(id);
            return response?.completed;
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const createTask = async (task) => {
        try {
            const response = await storeTask(task);
            console.log('response:', response);
            setTasks((prevTasks) => [...prevTasks, response]);
        } catch (error) {
            console.error('Error creating task:', error);
        }
    };

    const updateTask = async (id, updatedTask) => {
        try {
            const response = await updateTaskItem(id, updatedTask);
            setTasks((prevTasks) =>
                prevTasks.map((task) => (task._id === id ? response : task))
            );
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    const deleteTask = async (id) => {
        try {
            await removeTask(id);
            setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const markTaskAsCompleted = async (markTask) => {
        try {
            const isMarked = await fetchTask(markTask._id);
            console.log('isMarked:', isMarked);
            const response = await updateTaskItem(markTask._id, { ...markTask, completed: !isMarked });
            setTasks((tasks) =>
                tasks.map((task) => (task._id === markTask._id ? response : task))
            );
        } catch (error) {
            console.error('Error marking task as completed:', error);
        }
    };

    const editTask = (task) => {
        setCurrentTask(task);
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <TaskContext.Provider
            value={{
                tasks,
                loading,
                fetchTask,
                fetchTasks,
                createTask,
                editTask,
                currentTask,
                updateTask,
                deleteTask,
                markTaskAsCompleted,
            }}
        >
            {children}
        </TaskContext.Provider>
    );
};

export { TaskContext, TaskProvider };