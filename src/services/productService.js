import api from './api';

const productService = {
    getProducts: async () => {
        const response = await api.get('/products');
        return response.data;
    },
};

export default productService;