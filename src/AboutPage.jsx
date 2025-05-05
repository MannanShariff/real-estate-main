import React, { useState } from 'react';
import './ContactPage.css'; // Reuse styles for header/menu
import './AboutPage.css';
import { FaInfoCircle, FaHome, FaChartLine, FaRegAddressBook, FaBars, FaTimes } from 'react-icons/fa';
import { BiLogOut } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

const AboutPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { icon: <FaHome />, text: 'Home', action: () => navigate('/') },
    { icon: <FaChartLine />, text: 'Prediction Dashboard', action: () => navigate('/dashboard') },
    { icon: <FaInfoCircle />, text: 'About', action: () => navigate('/about') },
    { icon: <FaRegAddressBook />, text: 'Contact', action: () => navigate('/contact') },
    { icon: <BiLogOut />, text: 'Logout', action: () => { localStorage.removeItem('currentUser'); navigate('/login'); } },
  ];

  return (
    <div className="about-bg">
      <header className="contact-header">
        <div className="logo">
          <FaInfoCircle className="about-symbol" />
          <h1>About Us</h1>
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
          <span>About Menu</span>
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
      <div className="about-content-container">
        <div className="about-image-section">
          <img src="/icon1.jpg" alt="About EstateHub" className="about-main-image" />
        </div>
        <div className="about-text-section">
          <h2 className="about-title">Welcome to EstateHub</h2>
          <p className="about-desc">
            EstateHub is your trusted partner in real estate. Our mission is to empower buyers, sellers, and investors with the tools and insights they need to make confident property decisions.<br /><br />
            <b>What We Offer:</b><br />
            <ul className="about-list">
              <li>Accurate property price predictions using advanced analytics</li>
              <li>Easy-to-use dashboards for all your real estate needs</li>
              <li>Secure, transparent, and user-friendly experience</li>
              <li>Expert support and guidance at every step</li>
            </ul>
            <br />
            <b>Our Values:</b><br />
            <ul className="about-list">
              <li>Trust & Integrity</li>
              <li>Innovation</li>
              <li>Customer Focus</li>
              <li>Transparency</li>
            </ul>
            <br />
            Thank you for choosing EstateHub. We are committed to helping you build your future, one property at a time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage; 