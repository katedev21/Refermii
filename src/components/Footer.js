// src/components/Footer.js
import React from 'react';
import './Footer.css';

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <p>&copy; {year} ReferMii. All rights reserved.</p>
                    <div className="footer-links">
                        <a href="#" className="footer-link">Privacy Policy</a>
                        <a href="#" className="footer-link">Terms of Service</a>
                        <a href="#" className="footer-link">Contact</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;