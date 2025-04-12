const { MongoClient } = require('mongodb');
require('dotenv').config();

async function initializeDatabase() {
  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    await client.connect();
    console.log('Connected to MongoDB Atlas');

    const db = client.db('ppds');

    // Create collections with validation schemas
    await db.createCollection('nodes', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['nodeId', 'status', 'batteryLevel', 'location'],
          properties: {
            nodeId: { bsonType: 'string' },
            status: { enum: ['active', 'inactive', 'warning', 'error'] },
            batteryLevel: { bsonType: 'number' },
            location: { bsonType: 'string' },
            coordinates: {
              bsonType: 'object',
              required: ['latitude', 'longitude'],
              properties: {
                latitude: { bsonType: 'number' },
                longitude: { bsonType: 'number' }
              }
            },
            lastHeartbeat: { bsonType: 'date' }
          }
        }
      }
    });

    await db.createCollection('alerts', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['nodeId', 'type', 'status', 'timestamp'],
          properties: {
            nodeId: { bsonType: 'string' },
            type: { enum: ['gunshot', 'chainsaw'] },
            status: { enum: ['unacknowledged', 'acknowledged', 'ignored', 'dispatched'] },
            confidence: { bsonType: 'number' },
            location: { bsonType: 'string' },
            coordinates: {
              bsonType: 'object',
              required: ['latitude', 'longitude'],
              properties: {
                latitude: { bsonType: 'number' },
                longitude: { bsonType: 'number' }
              }
            },
            timestamp: { bsonType: 'date' }
          }
        }
      }
    });

    // Create indexes
    await db.collection('nodes').createIndex({ nodeId: 1 }, { unique: true });
    await db.collection('alerts').createIndex({ timestamp: -1 });
    await db.collection('alerts').createIndex({ nodeId: 1 });

    // Insert sample nodes
    const sampleNodes = [
      {
        nodeId: 'NODE001',
        status: 'active',
        batteryLevel: 85,
        location: 'North Ridge',
        coordinates: { latitude: -1.2921, longitude: 36.8219 },
        lastHeartbeat: new Date()
      },
      {
        nodeId: 'NODE002',
        status: 'warning',
        batteryLevel: 15,
        location: 'East Valley',
        coordinates: { latitude: -1.2980, longitude: 36.8250 },
        lastHeartbeat: new Date()
      },
      {
        nodeId: 'NODE003',
        status: 'active',
        batteryLevel: 92,
        location: 'West Forest',
        coordinates: { latitude: -1.2890, longitude: 36.8150 },
        lastHeartbeat: new Date()
      }
    ];

    // Insert sample alerts
    const sampleAlerts = [
      {
        nodeId: 'NODE001',
        type: 'gunshot',
        status: 'unacknowledged',
        confidence: 0.95,
        location: 'North Ridge',
        coordinates: { latitude: -1.2921, longitude: 36.8219 },
        timestamp: new Date(Date.now() - 1000 * 60 * 30) // 30 minutes ago
      },
      {
        nodeId: 'NODE002',
        type: 'chainsaw',
        status: 'acknowledged',
        confidence: 0.88,
        location: 'East Valley',
        coordinates: { latitude: -1.2980, longitude: 36.8250 },
        timestamp: new Date(Date.now() - 1000 * 60 * 60) // 1 hour ago
      },
      {
        nodeId: 'NODE003',
        type: 'gunshot',
        status: 'dispatched',
        confidence: 0.92,
        location: 'West Forest',
        coordinates: { latitude: -1.2890, longitude: 36.8150 },
        timestamp: new Date(Date.now() - 1000 * 60 * 120) // 2 hours ago
      }
    ];

    await db.collection('nodes').insertMany(sampleNodes);
    await db.collection('alerts').insertMany(sampleAlerts);

    console.log('Database initialized with sample data');
  } catch (err) {
    console.error('Error initializing database:', err);
  } finally {
    await client.close();
  }
}

initializeDatabase(); 