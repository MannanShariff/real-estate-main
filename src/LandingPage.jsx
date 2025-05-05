import React from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css"; // Import the CSS file
import { FaBuilding } from 'react-icons/fa';

const LandingPage = () => {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <>
            <div className="landing-container">
                {/* Header */}
                <nav className="navbar">
                    <div className="logo">
                        <img src="/icon.jpg" alt="EstateHub Logo" className="logo-image" />
                        <FaBuilding className="logo-icon" />
                        <span className="logo-text">EstateHub</span>
                    </div>
                    <div className="nav-buttons">
                        <button className="nav-btn" onClick={() => handleNavigation("/login")}>Login</button>
                        <button className="nav-btn signup" onClick={() => handleNavigation("/signup")}>Sign Up</button>
                    </div>
                </nav>

                {/* Main Section */}
                <div className="main-content">
                    <h1 className="get-started">Find Your Perfect Property Investment Today</h1>
                </div>
            </div>
        </>
    );
};

export default LandingPage;
