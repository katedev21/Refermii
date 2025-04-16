// src/components/ReferralCard.js
import React, { useState } from 'react';
import './ReferralCard.css';

const ReferralCard = ({ referral }) => {
    const [copied, setCopied] = useState(false);

    const handleCopyCode = () => {
        if (referral.code) {
            navigator.clipboard.writeText(referral.code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const handleCopyLink = () => {
        if (referral.link) {
            navigator.clipboard.writeText(referral.link);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    // Format date to display
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    // Calculate days until expiration
    const calculateDaysRemaining = (expirationDate) => {
        const today = new Date();
        const expiry = new Date(expirationDate);
        const diffTime = Math.abs(expiry - today);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    return (
        <div className="referral-card card">
            <div className="referral-header">
                <h3>{referral.brand}</h3>
                <div className="expiry-badge">
                    Expires in {calculateDaysRemaining(referral.expirationDate)} days
                </div>
            </div>

            {referral.code && (
                <div className="code-section">
                    <div className="code-display">
                        <span>Code:</span>
                        <code>{referral.code}</code>
                    </div>
                    <button
                        className="copy-btn"
                        onClick={handleCopyCode}
                        aria-label="Copy referral code"
                    >
                        {copied ? 'Copied!' : 'Copy'}
                    </button>
                </div>
            )}

            {referral.link && (
                <div className="link-section">
                    <div className="link-display">
                        <span>Link:</span>
                        <a href={referral.link} target="_blank" rel="noopener noreferrer">
                            {referral.link.length > 30 ? `${referral.link.substring(0, 30)}...` : referral.link}
                        </a>
                    </div>
                    <button
                        className="copy-btn"
                        onClick={handleCopyLink}
                        aria-label="Copy referral link"
                    >
                        {copied ? 'Copied!' : 'Copy'}
                    </button>
                </div>
            )}

            {referral.tags && referral.tags.length > 0 && (
                <div className="tags-section">
                    {referral.tags.map((tag, index) => (
                        <span key={index} className="tag">{tag}</span>
                    ))}
                </div>
            )}

            <div className="referral-footer">
                <span className="post-date">Posted: {formatDate(referral.postDate)}</span>
            </div>
        </div>
    );
};

export default ReferralCard;