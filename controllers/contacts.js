const mongodb = require("../db/connect");
const { ObjectId } = require("mongodb");

// GET /contacts
const getAll = async (req, res) => {
  try {
    const cursor = mongodb.getDb().db().collection("contacts").find();
    const lists = await cursor.toArray();

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists);
  } catch (error) {
    res.status(500).json({ message: "An unexpected error occurred.", error: error.message });
  }
};

// GET /contacts/:id
const getById = async (req, res) => {
  try {
    const userId = ObjectId.createFromHexString(req.params.id);
    const cursor = mongodb.getDb().db().collection("contacts").find({ _id: userId });
    const lists = await cursor.toArray();

    res.setHeader("Content-Type", "application/json");

    if (!lists[0]) return res.status(404).json({ message: "Contact not found." });

    res.status(200).json(lists[0]);
  } catch (error) {
    res.status(500).json({ message: "An unexpected error occurred.", error: error.message });
  }
};

// POST /contacts  -> expects 201 + { "id": "..." }
const createContact = async (req, res) => {
  try {
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;

    // All fields required
    if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
      return res.status(400).json({ message: "All fields are required: firstName, lastName, email, favoriteColor, birthday" });
    }

    const contact = { firstName, lastName, email, favoriteColor, birthday };
    const response = await mongodb.getDb().db().collection("contacts").insertOne(contact);

    if (response.acknowledged) {
      return res.status(201).json({ id: response.insertedId });
    }

    return res.status(500).json({ message: "Failed to create contact." });
  } catch (error) {
    res.status(500).json({ message: "An unexpected error occurred.", error: error.message });
  }
};

// PUT /contacts/:id -> expects 204
const updateContactById = async (req, res) => {
  try {
    const userId = ObjectId.createFromHexString(req.params.id);
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;

    // All fields required
    if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
      return res.status(400).json({ message: "All fields are required: firstName, lastName, email, favoriteColor, birthday" });
    }

    const contact = { firstName, lastName, email, favoriteColor, birthday };

    const response = await mongodb
      .getDb()
      .db()
      .collection("contacts")
      .replaceOne({ _id: userId }, contact);

    if (response.matchedCount === 0) {
      return res.status(404).json({ message: "Contact not found." });
    }

    return res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "An unexpected error occurred.", error: error.message });
  }
};

// DELETE /contacts/:id -> rubric screenshot expects 200
const deleteContactById = async (req, res) => {
  try {
    const userId = ObjectId.createFromHexString(req.params.id);

    const response = await mongodb.getDb().db().collection("contacts").deleteOne({ _id: userId });

    if (response.deletedCount > 0) {
      return res.status(200).json({ message: "Contact deleted." });
    }

    return res.status(404).json({ message: "Contact not found." });
  } catch (error) {
    res.status(500).json({ message: "An unexpected error occurred.", error: error.message });
  }
};

module.exports = {
  getAll,
  getById,
  createContact,
  updateContactById,
  deleteContactById
};
