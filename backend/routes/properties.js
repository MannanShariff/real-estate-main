const express = require('express');
const router = express.Router();
const Property = require('../models/Property');

// GET all properties
router.get('/', async (req, res) => {
    const properties = await Property.find();
    res.json(properties);
});

// POST new property
router.post('/', async (req, res) => {
    const newProperty = new Property(req.body);
    await newProperty.save();
    res.json(newProperty);
});

// PUT update property
router.put('/:id', async (req, res) => {
    const updated = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
});

// DELETE a property
router.delete('/:id', async (req, res) => {
    await Property.findByIdAndDelete(req.params.id);
    res.json({ success: true });
});

module.exports = router;
