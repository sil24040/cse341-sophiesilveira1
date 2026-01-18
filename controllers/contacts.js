const mongodb = require("../db/connect");
const { ObjectId } = require("mongodb");

const getAll = async (req, res) => {
  try {
    const result = await mongodb
      .getDb()
      .db("cse341")                 // ✅ force correct DB
      .collection("contacts")
      .find()
      .toArray();

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving contacts", error: err.message });
  }
};

const getSingle = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid contact id" });
    }

    const contactId = new ObjectId(req.params.id);

    const result = await mongodb
      .getDb()
      .db("cse341")                // ✅ force correct DB
      .collection("contacts")
      .findOne({ _id: contactId });

    if (!result) return res.status(404).json({ message: "Contact not found" });

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving contact", error: err.message });
  }
};

module.exports = { getAll, getSingle };