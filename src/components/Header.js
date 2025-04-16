// src/components/Header.js
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import ThemeContext from '../context/ThemeContext';
import './Header.css';

const Header = () => {
    const { darkMode, toggleDarkMode } = useContext(ThemeContext);

    return (
        <header className="header">
            <div className="container">
                <div className="header-content">
                    <Link to="/" className="logo">
                        <h1>ReferMii</h1>
                    </Link>
                    <nav>
                        <ul className="nav-links">
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/add" className="btn btn-primary">Add Referral</Link>
                            </li>
                            <li>
                                <button
                                    className="theme-toggle"
                                    onClick={toggleDarkMode}
                                    aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                                >
                                    {darkMode ? '☀️' : '🌙'}
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;