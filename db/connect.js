const dotenv = require("dotenv");
dotenv.config();

const { MongoClient } = require("mongodb");

let _client;

const initDb = (callback) => {
  if (_client) {
    console.log("Db is already initialized!");
    return callback(null, _client);
  }

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    return callback(new Error("MONGODB_URI is missing. Add it to .env (local) or Render Config Vars."));
  }

  MongoClient.connect(uri)
    .then((client) => {
      _client = client;
      callback(null, _client);
    })
    .catch((err) => callback(err));
};

const getDb = () => {
  if (!_client) throw Error("Db not initialized");
  return _client;
};

module.exports = {
  initDb,
  getDb
};
