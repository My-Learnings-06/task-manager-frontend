import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

console.log('API_URL:', API_URL);
// Set up Axios instance
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // To send cookies with requests,
  headers: {
    'Content-Type': 'application/json',
  },
  
});

// Auth API calls
export const signup = async (userData) => {
  const response = await api.post('/api/users/register', userData);
  return response.data;
};

export const login = async (userData) => {
  // console.log('userData:', userData);
  // console.log('baseURL:', baseURL);
  const response = await api.post('/api/users/login', userData);
  return response.data;
};

export const logout = async (userData) => {
  const response = await api.post('/api/users/logout', userData);
  return response.data;
};

// Task API calls
export const getTasks = async () => {
  const response = await api.get('/api/tasks');
  return response.data;
};

// Task API calls
export const getTask = async (id) => {
  const response = await api.get(`/api/tasks/${id}`);
  return response.data;
};

export const storeTask = async (taskData) => {
  const response = await api.post('/api/tasks', taskData);
  return response.data;
};

export const updateTaskItem = async (id, taskData) => {
  const response = await api.put(`/api/tasks/${id}`, taskData);
  return response.data;
};

export const removeTask = async (id) => {
  const response = await api.delete(`/api/tasks/${id}`);
  return response.data;
};
