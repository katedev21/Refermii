// src/services/apiService.js
import axios from 'axios';

// API base URL (should come from env config in production)
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// API service methods
const apiService = {
    // Get all referrals with optional filters
    getReferrals: async (filters = {}) => {
        try {
            const response = await api.get('/referrals', { params: filters });
            return response.data;
        } catch (error) {
            console.error('Error fetching referrals:', error);
            throw error;
        }
    },

    // Get a specific referral by ID
    getReferralById: async (id) => {
        try {
            const response = await api.get(`/referrals/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching referral with ID ${id}:`, error);
            throw error;
        }
    },

    // Add a new referral
    addReferral: async (referralData) => {
        try {
            const response = await api.post('/referrals', referralData);
            return response.data;
        } catch (error) {
            console.error('Error adding referral:', error);
            throw error;
        }
    },

    // Update an existing referral
    updateReferral: async (id, referralData) => {
        try {
            const response = await api.put(`/referrals/${id}`, referralData);
            return response.data;
        } catch (error) {
            console.error(`Error updating referral with ID ${id}:`, error);
            throw error;
        }
    },

    // Delete a referral
    deleteReferral: async (id) => {
        try {
            const response = await api.delete(`/referrals/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error deleting referral with ID ${id}:`, error);
            throw error;
        }
    }
};

export default apiService;