import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignupPage.css";
import { FaArrowLeft, FaSpinner, FaShieldAlt, FaHome, FaHandshake } from 'react-icons/fa';

const SignupPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
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
        setSuccess(false);
        
        if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
            setError("Please fill in all fields");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (formData.password.length < 6) {
            setError("Password must be at least 6 characters long");
            return;
        }

        setLoading(true);
        try {
            // Get existing users or initialize empty array
            const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
            
            // Check if email already exists
            if (existingUsers.some(user => user.email === formData.email)) {
                setError("Email already registered");
                setLoading(false);
                return;
            }

            // Create new user object
            const newUser = {
                id: Date.now(),
                username: formData.username,
                email: formData.email,
                password: formData.password // In a real app, this should be hashed
            };

            // Add new user to array and save back to localStorage
            existingUsers.push(newUser);
            localStorage.setItem('users', JSON.stringify(existingUsers));
            
            setSuccess(true);
            // Clear form
            setFormData({
                username: "",
                email: "",
                password: "",
                confirmPassword: ""
            });

            // Redirect to login page after 2 seconds
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } catch (error) {
            setError("Error creating account. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleBack = () => {
        navigate('/');
    };

    return (
        <div className="signup-container">
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
            <form className="signup-form" onSubmit={handleSubmit}>
                <h2>Create Your Account</h2>
                {error && <div className="error-message">{error}</div>}
                {success && <div className="success-message">
                    Registration successful! Redirecting to login...
                </div>}
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        placeholder="Enter your username"
                        disabled={loading}
                    />
                </div>
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
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        placeholder="Confirm your password"
                        disabled={loading}
                    />
                </div>
                <button 
                    type="submit" 
                    className="signup-button"
                    disabled={loading}
                >
                    {loading ? <FaSpinner className="spinner" /> : "Sign Up"}
                </button>
                <p className="login-link">
                    Already have an account? <a href="/login">Login</a>
                </p>
            </form>
            </div>
        </div>
    );
};

export default SignupPage;
