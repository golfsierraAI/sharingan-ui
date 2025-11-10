import api from './api';

/**
 * Payment Service - Handles Stripe payment operations
 * Following Stripe best practices:
 * - All sensitive operations happen server-side
 * - Client only receives client_secret
 * - Never expose secret keys on client
 */

/**
 * Create a payment intent on the server
 * @param {number} amount - Amount in cents (e.g., 1000 = $10.00)
 * @param {object} metadata - Additional order metadata
 * @returns {Promise<string>} clientSecret for confirming payment
 */
export const createPaymentIntent = async (amount, metadata = {}) => {
    try {
        const response = await api.post('/payments/create-intent', {
            amount,
            currency: 'usd',
            metadata,
        });
        
        return response.data.clientSecret;
    } catch (error) {
        console.error('Error creating payment intent:', error);
        throw new Error(
            error.response?.data?.message || 'Failed to initialize payment'
        );
    }
};

/**
 * Confirm order after successful payment
 * @param {string} paymentIntentId - The Stripe payment intent ID
 * @param {object} orderData - Order details (items, shipping, etc.)
 * @returns {Promise<object>} Order confirmation
 */
export const confirmOrder = async (paymentIntentId, orderData) => {
    try {
        const response = await api.post('/payments/confirm-order', {
            paymentIntentId,
            orderData,
        });
        
        return response.data;
    } catch (error) {
        console.error('Error confirming order:', error);
        throw new Error(
            error.response?.data?.message || 'Failed to confirm order'
        );
    }
};

/**
 * Get payment status
 * @param {string} paymentIntentId - The Stripe payment intent ID
 * @returns {Promise<object>} Payment status
 */
export const getPaymentStatus = async (paymentIntentId) => {
    try {
        const response = await api.get(`/payments/status/${paymentIntentId}`);
        return response.data;
    } catch (error) {
        console.error('Error getting payment status:', error);
        throw new Error(
            error.response?.data?.message || 'Failed to get payment status'
        );
    }
};

export default {
    createPaymentIntent,
    confirmOrder,
    getPaymentStatus,
};

