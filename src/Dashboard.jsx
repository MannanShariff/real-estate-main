import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

// Import icons from react-icons
import { FaHome, FaMapMarkerAlt, FaRupeeSign, FaChartLine, FaRegBuilding, FaBars, FaTimes } from 'react-icons/fa';
import { BiBed, BiBath } from 'react-icons/bi';
import { MdTrendingUp, MdCompare } from 'react-icons/md';
import { TbReportAnalytics } from 'react-icons/tb';
import { AiOutlineInfoCircle, AiOutlineContacts } from 'react-icons/ai';
import { BiLogOut } from 'react-icons/bi';

const Dashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);

    // State for form inputs
    const [area, setArea] = useState('');
    const [bhk, setBhk] = useState(2);
    const [bath, setBath] = useState(2);
    const [location, setLocation] = useState('');
    const [predictedPrice, setPredictedPrice] = useState(null);

    useEffect(() => {
        // Check if user is logged in
        const currentUser = localStorage.getItem('currentUser');
        if (!currentUser) {
            navigate('/login');
        } else {
            setUser(JSON.parse(currentUser));
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        navigate('/');
    };

    // Popular locations in Bangalore
    const popularLocations = [
        'Whitefield', 'Electronic City', 'Indiranagar',
        'Koramangala', 'HSR Layout', 'JP Nagar',
        'Marathahalli', 'Jayanagar', 'Bannerghatta Road'
    ];

    // Handle prediction
    const handlePrediction = (e) => {
        e.preventDefault();

        // This would be replaced with an actual API call to a ML model
        // For now, using a simple formula based on inputs
        const basePrice = 5000; // Base price per sqft

        // Location factors (in a real app, these would come from historical data)
        const locationFactors = {
            'Whitefield': 1.2,
            'Electronic City': 1.1,
            'Indiranagar': 1.8,
            'Koramangala': 1.7,
            'HSR Layout': 1.6,
            'JP Nagar': 1.4,
            'Marathahalli': 1.3,
            'Jayanagar': 1.5,
            'Bannerghatta Road': 1.3,
        };

        // Calculate price (simple formula for demo purposes)
        const locationFactor = locationFactors[location] || 1;
        const price = basePrice * parseFloat(area) * locationFactor * (0.9 + (bhk * 0.15)) * (0.95 + (bath * 0.1));

        setPredictedPrice(Math.round(price * 100) / 100);
    };

    const menuItems = [
        { icon: <FaHome />, text: 'Home', action: () => navigate('/home') },
        { icon: <FaChartLine />, text: 'Prediction Dashboard', action: () => navigate('/dashboard') },
        { icon: <AiOutlineInfoCircle />, text: 'About', action: () => navigate('/about') },
        { icon: <AiOutlineContacts />, text: 'Contact', action: () => navigate('/contact') },
        { icon: <BiLogOut />, text: 'Logout', action: handleLogout },
    ];

    if (!user) {
        return null; // or a loading spinner
    }

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <div className="logo">
                    <FaHome className="logo-icon" />
                    <h1>Real Estate Price Predictor</h1>
                </div>
                <button 
                    className="menu-toggle"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? <FaTimes /> : <FaBars />}
                </button>
            </header>
            
            <nav className={`side-menu ${menuOpen ? 'open' : ''}`}>
                <div className="menu-header">
                    <span>Welcome, {user.username}</span>
                </div>
                <ul className="menu-items">
                    {menuItems.map((item, index) => (
                        <li 
                            key={index}
                            onClick={() => {
                                item.action();
                                setMenuOpen(false);
                            }}
                            className="menu-item"
                        >
                            <span className="menu-icon">{item.icon}</span>
                            <span className="menu-text">{item.text}</span>
                        </li>
                    ))}
                </ul>
            </nav>
            
            <main className="dashboard-content">
                <div className="prediction-container">
                    <div className="input-section">
                        <h2><FaChartLine /> Predict Property Price</h2>
                        <form onSubmit={handlePrediction}>
                            <div className="form-group">
                                <label htmlFor="area">Area (sq ft)</label>
                                <input
                                    type="number"
                                    id="area"
                                    value={area}
                                    onChange={(e) => setArea(e.target.value)}
                                    placeholder="Enter area in square feet"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>BHK</label>
                                <div className="counter-input">
                                    {[1, 2, 3, 4, 5].map((num) => (
                                        <div
                                            key={num}
                                            className={`counter-option ${bhk === num ? 'selected' : ''}`}
                                            onClick={() => setBhk(num)}
                                        >
                                            <BiBed />
                                            {num}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Bathrooms</label>
                                <div className="counter-input">
                                    {[1, 2, 3, 4].map((num) => (
                                        <div
                                            key={num}
                                            className={`counter-option ${bath === num ? 'selected' : ''}`}
                                            onClick={() => setBath(num)}
                                        >
                                            <BiBath />
                                            {num}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="location">Location</label>
                                <select
                                    id="location"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    required
                                >
                                    <option value="">Select location</option>
                                    {popularLocations.map((loc) => (
                                        <option key={loc} value={loc}>{loc}</option>
                                    ))}
                                </select>
                            </div>

                            <button type="submit" className="predict-btn">
                                <TbReportAnalytics />
                                Predict Price
                            </button>
                        </form>

                        {predictedPrice && (
                            <div className="prediction-result">
                                <h3>Estimated Property Price:</h3>
                                <p>₹ {predictedPrice.toLocaleString('en-IN')}</p>
                                <small>*This is an approximate estimation based on the provided details</small>
                            </div>
                        )}
                    </div>
                </div>

                <div className="features-section">
                    <h2><MdTrendingUp /> Features</h2>
                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon">
                                <FaMapMarkerAlt />
                            </div>
                            <div className="feature-content">
                                <h3>Location-based Analysis</h3>
                                <p>Get price predictions based on specific locations in Bangalore</p>
                            </div>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">
                                <FaRegBuilding />
                            </div>
                            <div className="feature-content">
                                <h3>Property Specifications</h3>
                                <p>Consider BHK, bathroom count, and total area for accurate predictions</p>
                            </div>
                        </div>

                        <div className="feature-card premium">
                            <div className="feature-icon">
                                <MdCompare />
                            </div>
                            <div className="feature-content">
                                <h3>Price Comparison</h3>
                                <p>Compare prices across different locations and property types</p>
                                <span className="premium-badge">Premium</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;