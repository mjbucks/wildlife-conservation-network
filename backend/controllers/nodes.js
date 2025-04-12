const express = require('express');
const router = express.Router();
const { getDb } = require('../db/connection');
const { ObjectId } = require('mongodb');

// Get all nodes
router.get('/', async (req, res) => {
  try {
    const db = getDb();
    const nodes = await db.collection('nodes').find({}).toArray();
    res.json(nodes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get specific node
router.get('/:id', async (req, res) => {
  try {
    const db = getDb();
    const node = await db.collection('nodes').findOne({ nodeId: req.params.id });
    if (!node) {
      return res.status(404).json({ message: 'Node not found' });
    }
    res.json(node);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update node status
router.patch('/:id', async (req, res) => {
  try {
    const db = getDb();
    const result = await db.collection('nodes').updateOne(
      { nodeId: req.params.id },
      { $set: req.body }
    );
    
    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Node not found' });
    }
    
    const updatedNode = await db.collection('nodes').findOne({ nodeId: req.params.id });
    res.json(updatedNode);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
