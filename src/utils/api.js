import axios from 'axios';

const API_URL = import.meta.env.VITE_APP_API_LOCAL_URL;
// const API_URL = import.meta.env.VITE_APP_API_URL;

const api = axios.create({
    baseURL: API_URL,
    maxContentLength: Infinity,
});

// Add a request interceptor
api.interceptors.request.use(
    (config) => {
        // Add a token to the headers
        config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor
api.interceptors.response.use(
    (response) => {
        // Handle successful responses
        return response;
    },
    (error) => {
        // Handle errors
        if (error.response.status === 401) {
            // Handle unauthorized error
            console.log('Unauthorized');
        }
        return Promise.reject(error);
    }
);

export default api;