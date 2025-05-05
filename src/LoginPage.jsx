import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import { FaArrowLeft, FaSpinner, FaShieldAlt, FaHome, FaHandshake } from 'react-icons/fa';

const LoginPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            // Get users from localStorage
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            
            // Find user with matching email and password
            const user = users.find(u => 
                u.email === formData.email && 
                u.password === formData.password
            );

            if (!user) {
                setError('Invalid email or password. Please try again.');
                return;
            }

            // Create session user object (without password)
            const sessionUser = {
                id: user.id,
                username: user.username,
                email: user.email
            };

            // Store logged in user in localStorage
            localStorage.setItem('currentUser', JSON.stringify(sessionUser));
            
            // Clear form
            setFormData({
                email: "",
                password: ""
            });

            // Navigate to dashboard
            navigate('/dashboard');
        } catch (error) {
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleBack = () => {
        navigate('/');
    };

    return (
        <div className="login-container">
            <div className="left-section">
            <button className="back-button" onClick={handleBack}>
                <FaArrowLeft />
            </button>
                <div className="animated-shapes">
                    <div className="shape shape-1"></div>
                    <div className="shape shape-2"></div>
                    <div className="shape shape-3"></div>
                </div>
                <div className="trust-content">
                    <h1 className="trust-title">Trust, What we Build</h1>
                    <div className="trust-features">
                        <div className="feature-item">
                            <div className="feature-icon">
                                <FaShieldAlt />
                            </div>
                            <div className="feature-text">
                                <h3>Secure Transactions</h3>
                                <p>Your safety is our priority</p>
                            </div>
                        </div>
                        <div className="feature-item">
                            <div className="feature-icon">
                                <FaHome />
                            </div>
                            <div className="feature-text">
                                <h3>Quality Properties</h3>
                                <p>Find your dream home</p>
                            </div>
                        </div>
                        <div className="feature-item">
                            <div className="feature-icon">
                                <FaHandshake />
                            </div>
                            <div className="feature-text">
                                <h3>Trusted Partners</h3>
                                <p>Work with verified agents</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="right-section">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Welcome Back</h2>
                {error && <div className="error-message">{error}</div>}
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="Enter your email"
                        disabled={loading}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        placeholder="Enter your password"
                        disabled={loading}
                    />
                </div>
                <button 
                    type="submit" 
                    className="login-button"
                    disabled={loading}
                >
                    {loading ? <FaSpinner className="spinner" /> : "Login"}
                </button>
                <p className="signup-link">
                    Don't have an account? <a href="/signup">Sign Up</a>
                </p>
            </form>
            </div>
        </div>
    );
};

export default LoginPage;
