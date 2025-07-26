// routes/providerRoutes.js
const express = require('express');
const router = express.Router();
const Provider = require('../models/Providers');

// GET /api/providers - Fetches all providers or filters by category
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};
    const providers = await Provider.find(filter);
    res.json(providers);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// POST /api/providers - Adds a new provider
router.post('/', async (req, res) => {
  try {
    const newProvider = new Provider(req.body);
    const savedProvider = await newProvider.save();
    res.status(201).json(savedProvider);
  } catch (err) {
    res.status(400).json({ message: 'Error creating provider', error: err.message });
  }
});

module.exports = router;