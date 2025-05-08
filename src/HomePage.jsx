import React, { useState } from 'react';
import './HomePage.css';
import { FaBars, FaTimes, FaHome, FaChartLine } from 'react-icons/fa';
import { AiOutlineInfoCircle, AiOutlineContacts } from 'react-icons/ai';
import { BiLogOut } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

const propertyData = [
  {
    icon: '/icon4.jpeg',
    location: 'Whitefield',
    price: '₹1.2 Cr',
    thought: 'A peaceful haven for families and techies alike.'
  },
  {
    icon: '/icon5.jpeg',
    location: 'Koramangala',
    price: '₹2.1 Cr',
    thought: 'Trendy, vibrant, and always buzzing with life.'
  },
  {
    icon: '/icon6.jpeg',
    location: 'Jayanagar',
    price: '₹1.7 Cr',
    thought: 'Classic charm meets modern comfort.'
  },
  {
    icon: '/icon7.jpeg',
    location: 'JP Nagar',
    price: '₹1.3 Cr',
    thought: 'Green, serene, and perfect for families.'
  },
  {
    icon: '/icon8.jpeg',
    location: 'Indira Nagar',
    price: '₹2.4 Cr',
    thought: 'Luxury living in the heart of the city.'
  },
  {
    icon: '/icon9.jpeg',
    location: 'Electronic City',
    price: '₹95 L',
    thought: 'The IT hub with unbeatable value.'
  },
];

const HomePage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { icon: <FaHome />, text: 'Home', action: () => navigate('/home') },
    { icon: <FaChartLine />, text: 'Prediction Dashboard', action: () => navigate('/dashboard') },
    { icon: <AiOutlineInfoCircle />, text: 'About', action: () => navigate('/about') },
    { icon: <AiOutlineContacts />, text: 'Contact', action: () => navigate('/contact') },
    { icon: <BiLogOut />, text: 'Logout', action: () => { localStorage.removeItem('currentUser'); navigate('/login'); } },
  ];

  return (
    <div className="home-bg">
      <header className="home-header">
        <div className="logo">
          <img src="/icon.jpg" alt="EstateHub Logo" className="logo-image" />
          <span className="logo-text">EstateHub</span>
        </div>
        <button 
          className={`menu-toggle ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </header>
      <nav className={`side-menu ${menuOpen ? 'open' : ''}`}>
        <div className="menu-header">
          <span>Menu</span>
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
      <main className="home-content">
        <div className="main-image-container gradient-hero-bg">
          <div className="hero-content">
            <h1 className="hero-title">Discover Your Dream Home</h1>
            <p className="hero-subtitle">Luxury, Comfort, and Modern Living Await You</p>
          </div>
        </div>
        <div className="property-grid">
          {propertyData.map((property, idx) => (
            <div className="property-card animated-card" key={idx} style={{ animationDelay: `${idx * 0.1 + 0.2}s` }}>
              <div className="property-image-wrapper">
                <img src={property.icon} alt={property.location} className="property-icon" />
              </div>
              <div className="property-info">
                <div className="property-price">{property.price}</div>
                <div className="property-location">{property.location}</div>
              </div>
              <div className="property-thought">{property.thought}</div>
            </div>
          ))}
        </div>
        <div className="button-row-home">
          <button className="predict-btn-home" onClick={() => navigate('/dashboard')}>click to predict</button>
          <button className="add-remove-btn-home" onClick={() => navigate('/property-dashboard')}>Add/Remove</button>
        </div>
      </main>
    </div>
  );
};

export default HomePage; 