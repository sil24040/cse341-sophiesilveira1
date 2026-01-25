const { MongoClient } = require("mongodb");

let _db;

const initDb = async (callback) => {
  try {
    if (_db) {
      console.log("DB is already initialized.");
      return callback(null, _db);
    }

    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error("Missing MONGODB_URI in .env");
    }

    const client = new MongoClient(uri);
    await client.connect();

    _db = client;
    console.log("Connected to MongoDB.");
    return callback(null, _db);
  } catch (err) {
    return callback(err);
  }
};

const getDb = () => {
  if (!_db) {
    throw new Error("DB not initialized. Call initDb first.");
  }
  return _db;
};

module.exports = { initDb, getDb };
