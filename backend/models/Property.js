const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    title: String,
    location: String,
    price: Number,
    area: Number,
    bhk: Number,
    baths: Number,
    images: [String]
});

module.exports = mongoose.model('Property', propertySchema);
