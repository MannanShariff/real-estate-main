import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./DealerLogin.css";
import { FaBuilding, FaEnvelope, FaLock, FaSignInAlt, FaHome, FaUser } from "react-icons/fa";

const DealerLogin = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        if (!form.email || !form.password) {
            setError("Please fill in all fields.");
            setIsLoading(false);
            return;
        }

        if (!/\S+@\S+\.\S+/.test(form.email)) {
            setError("Please enter a valid email address.");
            setIsLoading(false);
            return;
        }

        try {
            // Mock API call (replace with actual backend endpoint)
            await new Promise((resolve) => setTimeout(resolve, 1000));
            localStorage.setItem("dealerToken", "mock-dealer-token");
            navigate("/PropertyDashboard"); // Changed from /dashboard to /PropertyDashboard
        } catch (err) {
            setError("Login failed. Please check your credentials.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <div className="dealer-login-container">
            {/* Header */}
            <nav className="navbar">
                <div className="logo">
                    <img src="/icon.jpg" alt="EstateHub Logo" className="logo-image" />
                    <FaBuilding className="logo-icon" />
                    <span className="logo-text">EstateHub</span>
                </div>
                <div className="nav-buttons">
                    <button className="nav-btn home" onClick={() => handleNavigation("/")}>
                        <FaHome className="btn-icon" /> Home
                    </button>
                    <button className="nav-btn user-login" onClick={() => handleNavigation("/login")}>
                        <FaUser className="btn-icon" /> User Login
                    </button>
                </div>
            </nav>

            {/* Main Section */}
            <div className="login-content">
                <div className="login-form-container">
                    <h2 className="form-title">Dealer Login</h2>
                    <form className="login-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <div className="input-wrapper">
                                <FaEnvelope className="input-icon" />
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <div className="input-wrapper">
                                <FaLock className="input-icon" />
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder="Enter your password"
                                    required
                                />
                            </div>
                        </div>
                        {error && <div className="error-message">{error}</div>}
                        <button type="submit" className="login-button" disabled={isLoading}>
                            <FaSignInAlt className="btn-icon" />
                            {isLoading ? "Logging in..." : "Login"}
                        </button>
                    </form>
                    <p className="switch-login">
                        Not a dealer?{" "}
                        <span
                            className="switch-link"
                            onClick={() => handleNavigation("/login")}
                        >
                            Login as a user
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default DealerLogin;