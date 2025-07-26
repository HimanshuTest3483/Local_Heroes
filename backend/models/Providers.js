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
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  reviews: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  }],
}, {
  timestamps: true,
});

module.exports = mongoose.model('Provider', ProviderSchema);
