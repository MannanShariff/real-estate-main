import React from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";
import { FaBuilding } from 'react-icons/fa';

const LandingPage = () => {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <div className="landing-container">
            {/* Header */}
            <nav className="navbar">
                <div className="logo">
                    <img src="/icon.jpg" alt="EstateHub Logo" className="logo-image" />
                    <FaBuilding className="logo-icon" />
                    <span className="logo-text">EstateHub</span>
                </div>
                <div className="nav-buttons">
                    <div className="user-buttons">
                        <button className="nav-btn user-login" onClick={() => handleNavigation("/login")}>
                            User Login
                        </button>
                        <button className="nav-btn user-signup" onClick={() => handleNavigation("/signup")}>
                            User Sign Up
                        </button>
                    </div>
                    <span className="button-separator">|</span>
                    <div className="dealer-buttons">
                        <button className="nav-btn dealer-login" onClick={() => handleNavigation("/DealerLogin")}>
                            Dealer Login
                        </button>
                        {/* <button className="nav-btn dealer-signup" onClick={() => handleNavigation("/login")}>
                            Dealer Sign Up
                        </button> */}
                    </div>
                </div>
            </nav>

            {/* Main Section */}
            <div className="main-content">
                <h1 className="headline">Discover Your Dream Property with EstateHub</h1>
                <p className="subheadline">Explore premium real estate investments tailored to your needs.</p>
                <button className="cta-button" onClick={() => handleNavigation("/login")}>
                    Get Started
                </button>
            </div>
        </div>
    );
};

export default LandingPage;