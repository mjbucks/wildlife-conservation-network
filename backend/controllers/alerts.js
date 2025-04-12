const express = require('express');
const router = express.Router();
const { getDb } = require('../db/connection');
const { ObjectId } = require('mongodb');

// Get all alerts with filtering
router.get('/', async (req, res) => {
  try {
    const db = getDb();
    const query = {};
    
    // Filter by type
    if (req.query.type) {
      query.type = req.query.type;
    }
    
    // Filter by status
    if (req.query.status) {
      query.status = req.query.status;
    }
    
    // Filter by time range
    if (req.query.since) {
      query.timestamp = { $gte: new Date(req.query.since) };
    }

    const alerts = await db.collection('alerts')
      .find(query)
      .sort({ timestamp: -1 })
      .limit(req.query.limit ? parseInt(req.query.limit) : 50)
      .toArray();
      
    res.json(alerts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create new alert
router.post('/', async (req, res) => {
  try {
    const db = getDb();
    const alert = {
      nodeId: req.body.nodeId,
      type: req.body.type,
      status: 'unacknowledged',
      confidence: req.body.confidence,
      location: req.body.location,
      coordinates: req.body.coordinates,
      timestamp: new Date()
    };

    const result = await db.collection('alerts').insertOne(alert);
    res.status(201).json({ ...alert, _id: result.insertedId });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update alert status
router.patch('/:id', async (req, res) => {
  try {
    const db = getDb();
    const result = await db.collection('alerts').updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: { status: req.body.status } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Alert not found' });
    }

    const updatedAlert = await db.collection('alerts').findOne({ _id: new ObjectId(req.params.id) });
    res.json(updatedAlert);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
