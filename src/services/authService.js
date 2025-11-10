import api from './api';

export const authService = {
    login: async (email, password) => {
        try {
            const response = await api.post('/auth/login', { email, password });
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Login failed');
        }
    },

    register: async (name, email, password) => {
        try {
            const response = await api.post('/auth/register', { name, email, password });
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Registration failed');
        }
    },

    logout: async () => {
        try {
            await api.post('/auth/logout');
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Logout failed');
        }
    },

    checkAuth: async () => {
        try {
            const response = await api.get('/auth/me');
            return response.data;
        } catch (error) {
            return null;
        }
    },
};
