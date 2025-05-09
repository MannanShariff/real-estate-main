import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Dashboard.css';

// Import icons from react-icons
import { FaHome, FaMapMarkerAlt, FaRupeeSign, FaChartLine, FaRegBuilding, FaBars, FaTimes, FaCheckCircle } from 'react-icons/fa';
import { BiBed, BiBath } from 'react-icons/bi';
import { MdTrendingUp, MdCompare } from 'react-icons/md';
import { TbReportAnalytics } from 'react-icons/tb';
import { AiOutlineInfoCircle, AiOutlineContacts } from 'react-icons/ai';
import { BiLogOut } from 'react-icons/bi';

const Dashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const [area, setArea] = useState('');
    const [bhk, setBhk] = useState(2);
    const [bath, setBath] = useState(2);
    const [location, setLocation] = useState('');
    const [predictedPrice, setPredictedPrice] = useState(null);
    const [propertyFound, setPropertyFound] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isAppointmentBooked, setIsAppointmentBooked] = useState(false);

    // Popular locations in Bangalore, including Frezer Town
    const popularLocations = [
        'Whitefield', 'Electronic City', 'Indiranagar',
        'Koramangala', 'HSR Layout', 'JP Nagar',
        'Marathahalli', 'Jayanagar', 'Bannerghatta Road',
        'Frezer Town'
    ];

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
        localStorage.removeItem('dealerToken');
        navigate('/');
    };

    const handlePrediction = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setPropertyFound(null);
        setPredictedPrice(null);
        setIsAppointmentBooked(false);

        try {
            // API call to fetch property from MongoDB with exact location and BHK match
            const response = await axios.get('/api/properties', {
                params: {
                    location: location.toLowerCase(),
                    bhk: parseInt(bhk)
                }
            });

            if (response.data && response.data.length > 0) {
                // Check for exact match
                const matchedProperty = response.data.find(
                    (property) =>
                        property.location.toLowerCase() === location.toLowerCase() &&
                        property.bhk === parseInt(bhk)
                );

                if (matchedProperty) {
                    // Exact match found
                    setPropertyFound(matchedProperty);
                    setPredictedPrice(matchedProperty.price);
                } else {
                    // No exact match
                    setPropertyFound(null);
                    setPredictedPrice(null);
                }
            } else {
                // No properties found
                setPropertyFound(null);
                setPredictedPrice(null);
            }
        } catch (error) {
            console.error('Error fetching property:', error);
            setPropertyFound(null);
            setPredictedPrice(null);
        } finally {
            setIsLoading(false);
        }
    };

    const handleBookAppointment = () => {
        // Simulate booking appointment (in a real app, this would be an API call)
        setIsAppointmentBooked(true);
        // Optionally, send a request to your backend to record the appointment
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

                            <button type="submit" className="predict-btn" disabled={isLoading}>
                                <TbReportAnalytics />
                                {isLoading ? 'Predicting...' : 'Predict Price'}
                            </button>
                        </form>

                        {propertyFound && predictedPrice && (
                            <div className="prediction-result">
                                <h3>Property Found!</h3>
                                <img
                                    src={propertyFound.imageUrl || 'https://via.placeholder.com/300x200?text=Property+Image'}
                                    alt={propertyFound.title}
                                    className="property-image"
                                />
                                <p className="price">
                                    <FaRupeeSign /> {predictedPrice.toLocaleString('en-IN')}
                                </p>
                                <div className="property-details">
                                    <p><strong>Title:</strong> {propertyFound.title}</p>
                                    <p><strong>Location:</strong> {propertyFound.location}</p>
                                    <p><strong>Area:</strong> {propertyFound.area} sq ft</p>
                                    <p><strong>BHK:</strong> {propertyFound.bhk}</p>
                                    <p><strong>Bathrooms:</strong> {propertyFound.baths}</p>
                                </div>
                                {!isAppointmentBooked ? (
                                    <button 
                                        className="buy-btn"
                                        onClick={handleBookAppointment}
                                    >
                                        Buy Property
                                    </button>
                                ) : (
                                    <div className="appointment-booked">
                                        <FaCheckCircle className="check-icon" />
                                        <p>Appointment Booked!</p>
                                    </div>
                                )}
                            </div>
                        )}

                        {!propertyFound && !isLoading && predictedPrice === null && location && (
                            <div className="prediction-result no-property">
                                <h3>No Properties Available</h3>
                                <p>Our properties are coming soon in this area!</p>
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