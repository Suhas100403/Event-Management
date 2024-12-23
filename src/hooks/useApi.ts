import { useEffect, useState } from 'react';
import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  timeout: 5000,
});

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.error || error.message || 'An error occurred';
    console.error('API Error:', message);
    return Promise.reject(new Error(message));
  }
);

export function useApiHealth() {
  const [isServerRunning, setIsServerRunning] = useState(false);

  useEffect(() => {
    const checkServer = async () => {
      try {
        await api.get('/health');
        setIsServerRunning(true);
      } catch (error) {
        setIsServerRunning(false);
        console.error('Server connection error:', error instanceof Error ? error.message : 'Unknown error');
      }
    };

    // Check immediately and then every 30 seconds
    checkServer();
    const interval = setInterval(checkServer, 30000);

    return () => clearInterval(interval);
  }, []);

  return { isServerRunning };
}

export { api };