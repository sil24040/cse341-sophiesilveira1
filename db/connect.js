const { MongoClient } = require("mongodb");

let _db;

const initDb = async (callback) => {
  try {
    if (_db) {
      return callback(null, _db);
    }

    const uri = process.env.MONGODB_URI;
    if (!uri) {
      return callback(new Error("MONGODB_URI is not set."), null);
    }

    const client = new MongoClient(uri);
    await client.connect();

    _db = client.db(); // uses DB name from the connection string (…/cse341)
    callback(null, _db);
  } catch (err) {
    callback(err, null);
  }
};

const getDb = () => {
  if (!_db) {
    throw Error("Database not initialized. Call initDb first.");
  }
  return _db;
};

module.exports = { initDb, getDb };
