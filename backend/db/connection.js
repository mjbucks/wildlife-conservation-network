const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

let db;

async function connectToDb() {
  try {
    await client.connect();
    db = client.db('ppds'); // database name
    console.log('Connected to Database');
    return db;
  } catch (err) {
    console.error('Database connection error:', err);
    process.exit(1);
  }
}

function getDb() {
  return db;
}

module.exports = { connectToDb, getDb }; 