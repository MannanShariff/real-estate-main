import React, { useState } from 'react';
import './ContactPage.css';
import { FaBuilding, FaPhoneAlt, FaMapMarkerAlt, FaBars, FaTimes, FaRegAddressBook, FaHome, FaChartLine } from 'react-icons/fa';
import { AiOutlineInfoCircle, AiOutlineContacts } from 'react-icons/ai';
import { BiLogOut } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

const ContactPage = () => {
  const [form, setForm] = useState({ email: '', name: '' });
  const [submitted, setSubmitted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3500);
    setForm({ email: '', name: '' });
  };

  const menuItems = [
    { icon: <FaHome />, text: 'Home', action: () => navigate('/') },
    { icon: <FaChartLine />, text: 'Prediction Dashboard', action: () => navigate('/dashboard') },
    { icon: <AiOutlineInfoCircle />, text: 'About', action: () => navigate('/about') },
    { icon: <FaRegAddressBook />, text: 'Contact', action: () => navigate('/contact') },
    { icon: <BiLogOut />, text: 'Logout', action: () => { localStorage.removeItem('currentUser'); navigate('/login'); } },
  ];

  return (
    <div className="contact-full-bg">
      <header className="contact-header">
        <div className="logo">
          <FaRegAddressBook className="logo-icon" />
          <h1>Contact Page</h1>
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
          <span>Contact Menu</span>
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
      <div className="contact-page-bg contact-full-width">
        <div className="contact-container contact-wide">
          <h1 className="contact-title">Contact Us</h1>
          <p className="contact-subtitle">Any questions or remarks? Just write us a message!</p>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="contact-inputs">
              <input
                type="email"
                name="email"
                placeholder="Enter a valid email address"
                value={form.email}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="name"
                placeholder="Enter your Name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="contact-submit">SUBMIT</button>
          </form>
          {submitted && (
            <div className="contact-success">
              Thank you! Your message has been sent.
              <span className="close-success" onClick={() => setSubmitted(false)}>×</span>
            </div>
          )}
          <div className="contact-info-cards">
            <div className="contact-info-card">
              <div className="contact-info-icon real-estate-icon">
                <FaBuilding />
              </div>
              <h3>ABOUT US</h3>
              <p>EstateHub - Your trusted real estate partner.<br />Buy, Sell, Rent, Invest.</p>
            </div>
            <div className="contact-info-card">
              <div className="contact-info-icon phone-icon">
                <FaPhoneAlt />
              </div>
              <h3>PHONE (LANDLINE)</h3>
              <p>+91 82170 27213<br />+91 88618 39338</p>
            </div>
            <div className="contact-info-card">
              <div className="contact-info-icon location-icon">
                <FaMapMarkerAlt />
              </div>
              <h3>OUR OFFICE LOCATION</h3>
              <p>The real-estate Design EstateHub Company<br />chickbanavar, bengaluru, karnataka.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage; 