// src/pages/AddReferral.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AddReferral.css';

const AddReferral = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        brand: '',
        code: '',
        link: '',
        tags: '',
        expirationDate: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    // API endpoint (should come from your env config in production)
    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Set default expiration date to 30 days from now
    const getDefaultExpirationDate = () => {
        const date = new Date();
        date.setDate(date.getDate() + 30);
        return date.toISOString().split('T')[0];
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form
        if (!formData.brand) {
            setError('Brand name is required');
            return;
        }

        if (!formData.code && !formData.link) {
            setError('Either a referral code or link is required');
            return;
        }

        const expirationDate = formData.expirationDate || getDefaultExpirationDate();

        // Prepare submission data
        const submissionData = {
            ...formData,
            tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()) : [],
            expirationDate
        };

        try {
            setLoading(true);
            setError(null);

            await axios.post(`${API_URL}/referrals`, submissionData);

            setSuccess(true);
            setFormData({
                brand: '',
                code: '',
                link: '',
                tags: '',
                expirationDate: ''
            });

            // Redirect to home after successful submission
            setTimeout(() => {
                navigate('/');
            }, 2000);

        } catch (err) {
            let errorMessage = 'Failed to add referral code. Please try again.';

            if (err.response && err.response.data && err.response.data.errors) {
                const serverErrors = err.response.data.errors;
                errorMessage = serverErrors.map(e => e.msg).join(', ');
            } else if (err.response && err.response.data && err.response.data.message) {
                errorMessage = err.response.data.message;
            }

            setError(errorMessage);
            console.error('Error adding referral:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="add-referral-page">
            <h2>Add New Referral Code</h2>

            {success && (
                <div className="alert alert-success">
                    Referral code added successfully! Redirecting to home page...
                </div>
            )}

            {error && (
                <div className="alert alert-danger">
                    {error}
                </div>
            )}

            <div className="form-container card">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="brand">Brand/Company Name*</label>
                        <input
                            type="text"
                            id="brand"
                            name="brand"
                            className="form-control"
                            value={formData.brand}
                            onChange={handleChange}
                            placeholder="e.g., Uber, Airbnb, DoorDash"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="code">Referral Code</label>
                        <input
                            type="text"
                            id="code"
                            name="code"
                            className="form-control"
                            value={formData.code}
                            onChange={handleChange}
                            placeholder="e.g., SAVE10"
                        />
                        <small>Either a code or a link is required</small>
                    </div>

                    <div className="form-group">
                        <label htmlFor="link">Referral Link</label>
                        <input
                            type="url"
                            id="link"
                            name="link"
                            className="form-control"
                            value={formData.link}
                            onChange={handleChange}
                            placeholder="https://example.com/referral/..."
                        />
                        <small>Either a code or a link is required</small>
                    </div>

                    <div className="form-group">
                        <label htmlFor="tags">Tags (comma separated)</label>
                        <input
                            type="text"
                            id="tags"
                            name="tags"
                            className="form-control"
                            value={formData.tags}
                            onChange={handleChange}
                            placeholder="e.g., food delivery, travel, shopping"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="expirationDate">Expiration Date</label>
                        <input
                            type="date"
                            id="expirationDate"
                            name="expirationDate"
                            className="form-control"
                            value={formData.expirationDate}
                            onChange={handleChange}
                            min={new Date().toISOString().split('T')[0]}
                            placeholder="Leave blank for 30 days from now"
                        />
                        <small>If left blank, defaults to 30 days from today</small>
                    </div>

                    <div className="form-actions">
                        <button
                            type="button"
                            className="btn btn-outline"
                            onClick={() => navigate('/')}
                            disabled={loading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={loading}
                        >
                            {loading ? 'Submitting...' : 'Add Referral'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddReferral;