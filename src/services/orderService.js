import api from './api';

const orderService = {
    getOrders: async () => {
        try {
            const response = await api.get('/orders');
            return response.data;
        } catch (error) {
            console.error('Error fetching orders:', error);
            throw error;
        }
    },
};

export default orderService;
