import React, { useState, useEffect, useRef } from 'react';
import './PropertyDashboard.css';
import { FaHome, FaChartLine, FaPlus, FaEdit, FaTrash, FaBars, FaTimes } from 'react-icons/fa';
import { AiOutlineInfoCircle, AiOutlineContacts } from 'react-icons/ai';
import { BiLogOut } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const defaultForm = {
  title: '',
  location: '',
  price: '',
  area: '',
  bhk: '',
  baths: '',
  images: [],
};

const LOCAL_KEY = 'property_dashboard_properties';

const PropertyDashboard = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [properties, setProperties] = useState([]);
  const [form, setForm] = useState(defaultForm);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [imageError, setImageError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const fileInputRef = useRef();

  // Load properties from backend
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/properties');
        const data = await res.json();
        setProperties(data);
      } catch (err) {
        console.error('Error fetching properties:', err);
      }
    };
    fetchProperties();
  }, []);

  // Handle menu navigation
  const handleMenu = (action) => {
    setMenuOpen(false);
    if (action === 'home') navigate('/home');
    else if (action === 'dashboard') navigate('/dashboard');
    else if (action === 'about') navigate('/about');
    else if (action === 'contact') navigate('/contact');
    else if (action === 'logout') {
      localStorage.removeItem('currentUser');
      navigate('/login');
    }
  };

  // Handle form input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length !== 1) {
      setImageError('Please select exactly one image.');
      return;
    }
    setImageError('');
    const reader = new FileReader();
    reader.onload = (ev) => {
      setForm((prev) => ({ ...prev, images: [ev.target.result] }));
    };
    reader.readAsDataURL(files[0]);
  };

  // Add or update property
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!form.title || !form.location || !form.price || !form.area || !form.bhk || !form.baths) {
      setImageError('Please fill all fields.');
      return;
    }
  
    if (!form.images || form.images.length !== 1) {
      setImageError('Please select exactly one image.');
      return;
    }
  
    const priceInRupees = parseFloat(form.price) * 100000;
    const propertyData = { ...form, price: priceInRupees };
  
    setIsSubmitting(true);
  
    try {
      if (isEditing) {
        const res = await axios.put(`http://localhost:5000/api/properties/${editId}`, propertyData);
        setProperties((prev) =>
          prev.map((p) => (p._id === editId ? res.data : p))
        );
        setIsEditing(false);
        setEditId(null);
      } else {
        const res = await axios.post('http://localhost:5000/api/properties', propertyData);
        setProperties((prev) => [...prev, res.data]);
      }
  
      setForm(defaultForm);
      if (fileInputRef.current) fileInputRef.current.value = '';
      setImageError('');
    } catch (err) {
      console.error('Error saving property:', err);
      setImageError('Error saving property. Please try again.');
    }
  
    setIsSubmitting(false);
  };

  // Edit property
  const handleEdit = (property) => {
    setForm({ ...property, price: (property.price / 100000).toFixed(2) }); // Convert rupees to lacs
    setIsEditing(true);
    setEditId(property._id);
    setImageError('');
  };

  // Delete property
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/properties/${id}`);
      setProperties((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error('Error deleting property:', err);
      setImageError('Error deleting property. Please try again.');
    }
  };

  // Cancel edit
  const handleCancel = () => {
    setIsEditing(false);
    setEditId(null);
    setForm(defaultForm);
    setImageError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const menuItems = [
    { icon: <FaHome />, text: 'Home', action: () => handleMenu('home') },
    { icon: <FaChartLine />, text: 'Dashboard', action: () => handleMenu('dashboard') },
    { icon: <AiOutlineInfoCircle />, text: 'About', action: () => handleMenu('about') },
    { icon: <AiOutlineContacts />, text: 'Contact', action: () => handleMenu('contact') },
    { icon: <BiLogOut />, text: 'Logout', action: () => handleMenu('logout') },
  ];

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="logo">
          <FaHome className="logo-icon" />
          <h1>EstateHub</h1>
        </div>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </header>
      <nav className={`side-menu ${menuOpen ? 'open' : ''}`}>
        <div className="menu-header">
          <span>Menu</span>
        </div>
        <ul className="menu-items">
          {menuItems.map((item, idx) => (
            <li key={idx} onClick={item.action} className="menu-item">
              <span className="menu-icon">{item.icon}</span>
              <span className="menu-text">{item.text}</span>
            </li>
          ))}
        </ul>
      </nav>
      <main className="dashboard-content">
        <h2 className="featured-title">Manage Properties</h2>
        <div className="property-form-section">
          <form className="property-form-grid" onSubmit={handleSubmit}>
            <div className="form-row-grid">
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  id="title"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Enter property title"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="location">Location</label>
                <input
                  id="location"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="Enter location"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="price">Price (Lacs)</label>
                <input
                  id="price"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="Enter price in lacs"
                  type="number"
                  step="0.01"
                  required
                />
              </div>
            </div>
            <div className="form-row-grid">
              <div className="form-group">
                <label htmlFor="area">Area (sq.ft)</label>
                <input
                  id="area"
                  name="area"
                  value={form.area}
                  onChange={handleChange}
                  placeholder="Enter area"
                  type="number"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="bhk">Beds (BHK)</label>
                <input
                  id="bhk"
                  name="bhk"
                  value={form.bhk}
                  onChange={handleChange}
                  placeholder="Enter BHK"
                  type="number"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="baths">Baths</label>
                <input
                  id="baths"
                  name="baths"
                  value={form.baths}
                  onChange={handleChange}
                  placeholder="Enter baths"
                  type="number"
                  required
                />
              </div>
            </div>
            <div className="form-row-grid form-row-center">
              <label className="choose-image-label">
                Upload Image
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  ref={fileInputRef}
                />
              </label>
              {imageError && <div className="image-error">{imageError}</div>}
              <div className="image-preview-row">
                {form.images[0] && (
                  <div className="image-preview">
                    <img src={form.images[0]} alt="preview" />
                  </div>
                )}
              </div>
            </div>
            <div className="form-row-grid form-row-center">
              <button
                type="submit"
                className="add-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Processing...' : isEditing ? <><FaEdit /> Update Property</> : <><FaPlus /> Add Property</>}
              </button>
              {isEditing && (
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={handleCancel}
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
        <div className="property-listings-section">
          <h3 className="property-listings-title">Your Properties</h3>
          <div className="property-grid">
            {properties.length === 0 ? (
              <p className="no-properties">No properties added yet.</p>
            ) : (
              properties.map((property) => (
                <div className="property-card" key={property._id}>
                  <div className="property-image-wrapper">
                    {property.images[0] && (
                      <img src={property.images[0]} alt={property.title} />
                    )}
                  </div>
                  <div className="property-info">
                    <h3 className="property-title">{property.title}</h3>
                    <p className="property-location">{property.location}</p>
                    <div className="property-details">
                      <span>₹{(property.price / 100000).toFixed(2)} Lacs</span>
                      <span>{property.area} sq.ft</span>
                    </div>
                    <div className="property-details">
                      <span>{property.bhk} BHK</span>
                      <span>{property.baths} Baths</span>
                    </div>
                  </div>
                  <div className="property-actions">
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(property)}
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(property._id)}
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default PropertyDashboard;