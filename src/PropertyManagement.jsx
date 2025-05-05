import React, { useState } from 'react';
import './PropertyManagement.css';

const PropertyManagement = () => {
    const [properties, setProperties] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        location: '',
        area: '',
        bedrooms: '',
        bathrooms: '',
        status: 'available' // available, rented, sold
    });
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (isEditing) {
            // Update existing property
            setProperties(properties.map(property => 
                property.id === editId ? { ...formData, id: editId } : property
            ));
            setIsEditing(false);
            setEditId(null);
        } else {
            // Add new property
            const newProperty = {
                ...formData,
                id: Date.now(),
                createdAt: new Date().toISOString()
            };
            setProperties([...properties, newProperty]);
        }

        // Reset form
        setFormData({
            title: '',
            description: '',
            price: '',
            location: '',
            area: '',
            bedrooms: '',
            bathrooms: '',
            status: 'available'
        });
    };

    const handleEdit = (property) => {
        setFormData(property);
        setIsEditing(true);
        setEditId(property.id);
    };

    const handleDelete = (id) => {
        setProperties(properties.filter(property => property.id !== id));
    };

    return (
        <div className="property-management">
            <h2>Property Management</h2>
            
            <form onSubmit={handleSubmit} className="property-form">
                <div className="form-group">
                    <label>Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Price (₹)</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Location</label>
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Area (sqft)</label>
                        <input
                            type="number"
                            name="area"
                            value={formData.area}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Bedrooms</label>
                        <input
                            type="number"
                            name="bedrooms"
                            value={formData.bedrooms}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Bathrooms</label>
                        <input
                            type="number"
                            name="bathrooms"
                            value={formData.bathrooms}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label>Status</label>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="available">Available</option>
                        <option value="rented">Rented</option>
                        <option value="sold">Sold</option>
                    </select>
                </div>

                <button type="submit" className="submit-btn">
                    {isEditing ? 'Update Property' : 'Add Property'}
                </button>
            </form>

            <div className="properties-list">
                <h3>Properties</h3>
                {properties.length === 0 ? (
                    <p>No properties added yet</p>
                ) : (
                    <div className="property-grid">
                        {properties.map(property => (
                            <div key={property.id} className="property-card">
                                <h4>{property.title}</h4>
                                <p>{property.description}</p>
                                <div className="property-details">
                                    <span>₹{property.price}</span>
                                    <span>{property.area} sqft</span>
                                    <span>{property.bedrooms} BHK</span>
                                    <span>{property.bathrooms} Bath</span>
                                </div>
                                <p>Location: {property.location}</p>
                                <p>Status: {property.status}</p>
                                <div className="property-actions">
                                    <button onClick={() => handleEdit(property)}>Edit</button>
                                    <button onClick={() => handleDelete(property.id)}>Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PropertyManagement; 