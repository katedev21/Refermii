// src/pages/Home.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReferralCard from '../components/ReferralCard';
import './Home.css';

const Home = () => {
    const [referrals, setReferrals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState('');
    const [filteredReferrals, setFilteredReferrals] = useState([]);
    const [filterBrands, setFilterBrands] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState('');

    // API endpoint (should come from your env config in production)
    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

    // Fetch referrals from API
    useEffect(() => {
        const fetchReferrals = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${API_URL}/referrals`);
                setReferrals(response.data);
                setFilteredReferrals(response.data);

                // Extract unique brands for filter
                const brands = [...new Set(response.data.map(ref => ref.brand))];
                setFilterBrands(brands);

                setLoading(false);
            } catch (err) {
                setError('Failed to load referral codes. Please try again later.');
                setLoading(false);
                console.error('Error fetching referrals:', err);
            }
        };

        fetchReferrals();
    }, [API_URL]);

    // Filter referrals based on search and brand filter
    useEffect(() => {
        if (referrals.length > 0) {
            let result = [...referrals];

            // Apply search filter
            if (search) {
                const searchTerm = search.toLowerCase();
                result = result.filter(ref =>
                    ref.brand.toLowerCase().includes(searchTerm) ||
                    (ref.tags && ref.tags.some(tag => tag.toLowerCase().includes(searchTerm)))
                );
            }

            // Apply brand filter
            if (selectedBrand) {
                result = result.filter(ref => ref.brand === selectedBrand);
            }

            setFilteredReferrals(result);
        }
    }, [search, selectedBrand, referrals]);

    // Handle search input change
    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    // Handle brand filter change
    const handleBrandChange = (e) => {
        setSelectedBrand(e.target.value);
    };

    // Clear all filters
    const clearFilters = () => {
        setSearch('');
        setSelectedBrand('');
    };

    return (
        <div className="home-page">
            <div className="hero-section">
                <h2>Find & Share Referral Codes</h2>
                <p>Save money with referral codes and help others do the same!</p>
            </div>

            <div className="filters-section">
                <div className="search-box">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by brand or tag"
                        value={search}
                        onChange={handleSearchChange}
                    />
                </div>

                <div className="brand-filter">
                    <select
                        className="form-control"
                        value={selectedBrand}
                        onChange={handleBrandChange}
                    >
                        <option value="">All Brands</option>
                        {filterBrands.map(brand => (
                            <option key={brand} value={brand}>{brand}</option>
                        ))}
                    </select>
                </div>

                <button className="btn btn-outline" onClick={clearFilters}>
                    Clear Filters
                </button>
            </div>

            {loading ? (
                <div className="loading-message">Loading referral codes...</div>
            ) : error ? (
                <div className="error-message">{error}</div>
            ) : (
                <div className="referrals-grid">
                    {filteredReferrals.length > 0 ? (
                        filteredReferrals.map(referral => (
                            <ReferralCard key={referral._id} referral={referral} />
                        ))
                    ) : (
                        <div className="no-results">
                            <p>No referral codes found. Try adjusting your filters or add a new one!</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Home;