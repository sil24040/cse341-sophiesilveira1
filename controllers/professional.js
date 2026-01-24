const mongodb = require("../db/connect");

const getData = async (req, res) => {
  try {
    const cursor = mongodb.getDb().db().collection("user").find();
    const lists = await cursor.toArray();

    res.setHeader("Content-Type", "application/json");

    if (!lists[0]) return res.status(404).json({ message: "No user profile found in 'user' collection." });

    res.status(200).json(lists[0]); // single profile
  } catch (error) {
    res.status(500).json({ message: "An unexpected error occurred.", error: error.message });
  }
};

module.exports = { getData };
