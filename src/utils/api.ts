import axios from 'axios';

const api = axios.create({
  baseURL: '/api', // Use relative URL to work with Vite proxy
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.message);
    return Promise.reject(error);
  }
);

export default api;