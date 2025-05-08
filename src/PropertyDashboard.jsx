import React, { useState, useEffect, useRef } from 'react';
import './Dashboard.css';
import './PropertyManagement.css';
import { FaHome, FaChartLine, FaPlus, FaEdit, FaTrash, FaBars, FaTimes, FaImages } from 'react-icons/fa';
import { AiOutlineInfoCircle, AiOutlineContacts } from 'react-icons/ai';
import { BiLogOut } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
  const fileInputRef = useRef();

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_KEY);
    if (stored) setProperties(JSON.parse(stored));
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(properties));
  }, [properties]);

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
    if (files.length < 1 || files.length > 4) {
      setImageError('Please select between 1 and 4 images.');
      return;
    }
    setImageError('');
    // Read files as base64
    Promise.all(files.map(file => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (ev) => resolve(ev.target.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    })).then(images => {
      setForm(prev => ({ ...prev, images }));
    });
  };

  // Add or update property
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.location || !form.price || !form.area || !form.bhk || !form.baths) return;
    if (!form.images || form.images.length < 1 || form.images.length > 4) {
      setImageError('Please select between 1 and 4 images.');
      return;
    }
    setImageError('');
    if (isEditing) {
      setProperties((prev) =>
        prev.map((p) => (p.id === editId ? { ...form, id: editId } : p))
      );
      setIsEditing(false);
      setEditId(null);
    } else {
      setProperties((prev) => [
        ...prev,
        { ...form, id: Date.now() },
      ]);
    }
    setForm(defaultForm);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Edit property
  const handleEdit = (property) => {
    setForm({ ...property });
    setIsEditing(true);
    setEditId(property.id);
    setImageError('');
  };

  // Delete property
  const handleDelete = (id) => {
    setProperties((prev) => prev.filter((p) => p.id !== id));
    if (isEditing && editId === id) {
      setIsEditing(false);
      setEditId(null);
      setForm(defaultForm);
      setImageError('');
      if (fileInputRef.current) fileInputRef.current.value = '';
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
          <h1>EstateHub Dashboard</h1>
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
            <li key={idx} onClick={() => { item.action(); setMenuOpen(false); }} className="menu-item">
              <span className="menu-icon">{item.icon}</span>
              <span className="menu-text">{item.text}</span>
            </li>
          ))}
        </ul>
      </nav>
      <main className="dashboard-content">
        <h2 className="featured-title">Featured Properties</h2>
        <div className="property-form-section">
          <form className="property-form-grid" onSubmit={handleSubmit}>
            {/* Row 1: Title, Location, Price */}
            <div className="form-row-grid">
              <input name="title" value={form.title} onChange={handleChange} placeholder="title" required />
              <input name="location" value={form.location} onChange={handleChange} placeholder="location" required />
              <input name="price" value={form.price} onChange={handleChange} placeholder="Price" type="number" required />
            </div>
            {/* Row 2: Area, Beds, Bath */}
            <div className="form-row-grid">
              <input name="area" value={form.area} onChange={handleChange} placeholder="area(sq.ft)" type="number" required />
              <input name="bhk" value={form.bhk} onChange={handleChange} placeholder="Beds" type="number" required />
              <input name="baths" value={form.baths} onChange={handleChange} placeholder="Bath" type="number" required />
            </div>
            {/* Row 3: Choose image */}
            <div className="form-row-grid" style={{ justifyContent: 'center' }}>
              <label className="choose-image-label">
                Choose image
                <input
                  type="file"
                  accept="image/*"
                  onChange={e => {
                    const files = Array.from(e.target.files);
                    if (files.length !== 1) {
                      setImageError('Please select only one image.');
                      setForm(prev => ({ ...prev, images: [] }));
                      return;
                    }
                    setImageError('');
                    const reader = new FileReader();
                    reader.onload = (ev) => {
                      setForm(prev => ({ ...prev, images: [ev.target.result] }));
                    };
                    reader.readAsDataURL(files[0]);
                  }}
                  ref={fileInputRef}
                />
              </label>
              {imageError && <div className="image-error">{imageError}</div>}
              <div className="image-preview-row">
                {form.images && form.images[0] && (
                  <div>
                    <img src={form.images[0]} alt="preview" />
                  </div>
                )}
              </div>
            </div>
            {/* Row 4: Add Property Button */}
            <div className="form-row-grid" style={{ justifyContent: 'center' }}>
              <button type="submit" className="add-btn">
                {isEditing ? <FaEdit /> : <FaPlus />} {isEditing ? 'Update' : 'Add'} Property
              </button>
              {isEditing && (
                <button type="button" className="cancel-btn" onClick={handleCancel}>
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
        <div className="property-listings-section">
          <h3 className="property-listings-title">Property Listings</h3>
          <div className="property-grid">
            {properties.length === 0 ? (
              <p style={{ textAlign: 'center', width: '100%' }}>No properties added yet.</p>
            ) : (
              properties.map((property) => (
                <div className="property-card static-card" key={property.id}>
                  <div className="property-image-wrapper property-card-image-wrapper" style={{ gap: 18, minHeight: 120, flexWrap: 'wrap', justifyContent: 'flex-start' }}>
                    {property.images && property.images[0] && (
                      <div>
                        <img src={property.images[0]} alt="property-img" />
                      </div>
                    )}
                  </div>
                  <div className="property-info">
                    <div className="property-title">{property.title}</div>
                    <div className="property-location">{property.location}</div>
                    <div className="property-details">
                      <span>₹{property.price}</span> | <span>{property.area} sq.ft</span>
                    </div>
                    <div className="property-details">
                      <span>{property.bhk} BHK</span> | <span>{property.baths} Baths</span>
                    </div>
                  </div>
                  <div className="property-actions">
                    <button className="edit-btn animated-btn" onClick={() => handleEdit(property)}><FaEdit /> Edit</button>
                    <button className="delete-btn animated-btn" onClick={() => handleDelete(property.id)}><FaTrash /> Delete</button>
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