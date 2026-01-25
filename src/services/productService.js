import api from './api';

const productService = {
    getProducts: async () => {
        try {
            const response = await api.get('/products');
            return response.data;
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    },
};

export default productService;