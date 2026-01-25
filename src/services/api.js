import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const api = axios.create({
    baseURL: `${API_BASE_URL}/api`, // Add /api prefix to all routes
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        // Only redirect to login for 401 errors on routes that require authentication
        // Exclude public routes like products, auth endpoints
        const publicRoutes = ['/products', '/auth/me'];
        const isPublicRoute = publicRoutes.some(route => error.config?.url?.includes(route));
        
        if (error.response?.status === 401 && !isPublicRoute) {
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;

