// models/Provider.js
const mongoose = require('mongoose');

const ProviderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['Plumber', 'Electrician', 'Tiffin Service', 'Tailor', 'Carpenter'],
  },
  contact: {
    type: String,
    required: true,
  },
  location: {
    lat: { type: Number, required: true },
    lon: { type: Number, required: true },
  },
  operatingHours: {
    type: String,
    default: "9:00 AM - 7:00 PM",
  },
});

module.exports = mongoose.model('Provider', ProviderSchema);
