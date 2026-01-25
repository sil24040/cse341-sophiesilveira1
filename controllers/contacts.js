const mongodb = require("../db/connect");
const { ObjectId } = require("mongodb");

// GET /contacts
const getAll = async (req, res) => {
  try {
    const result = await mongodb
      .getDb()
      .db()
      .collection("contacts")
      .find()
      .toArray();

    return res.status(200).json(result);
  } catch (err) {
    console.error("GET /contacts error FULL:", err);
    return res.status(500).json({
      message: "Some error occurred while fetching contacts.",
      error: err.message,
    });
  }
}; // ✅ THIS was missing in your file

// GET /contacts/:id
const getSingle = async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid contact id." });
    }

    const contactId = new ObjectId(id);

    const result = await mongodb
      .getDb()
      .db()
      .collection("contacts")
      .findOne({ _id: contactId });

    if (!result) {
      return res.status(404).json({ message: "Contact not found." });
    }

    return res.status(200).json(result);
  } catch (err) {
    console.error("GET /contacts/:id error:", err);
    return res
      .status(500)
      .json({ message: "Some error occurred while fetching the contact." });
  }
};

// POST /contacts
const createContact = async (req, res) => {
  try {
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday,
    };

    // NOTE: Rubric says "All fields are required"
    if (
      !contact.firstName ||
      !contact.lastName ||
      !contact.email ||
      !contact.favoriteColor ||
      !contact.birthday
    ) {
      return res.status(400).json({
        message: "All fields are required: firstName, lastName, email, favoriteColor, birthday.",
      });
    }

    const response = await mongodb
      .getDb()
      .db()
      .collection("contacts")
      .insertOne(contact);

    return res.status(201).json({
      message: "Contact created.",
      id: response.insertedId,
    });
  } catch (err) {
    console.error("POST /contacts error:", err);
    return res
      .status(500)
      .json({ message: "Some error occurred while creating the contact." });
  }
};

// PUT /contacts/:id
const updateContact = async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid contact id." });
    }

    const contactId = new ObjectId(id);

    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday,
    };

    // NOTE: Rubric says "All fields are required"
    if (
      !contact.firstName ||
      !contact.lastName ||
      !contact.email ||
      !contact.favoriteColor ||
      !contact.birthday
    ) {
      return res.status(400).json({
        message: "All fields are required: firstName, lastName, email, favoriteColor, birthday.",
      });
    }

    const response = await mongodb
      .getDb()
      .db()
      .collection("contacts")
      .replaceOne({ _id: contactId }, contact);

    if (response.matchedCount === 0) {
      return res.status(404).json({ message: "Contact not found." });
    }

    return res.status(204).send();
  } catch (err) {
    console.error("PUT /contacts/:id error:", err);
    return res
      .status(500)
      .json({ message: "Some error occurred while updating the contact." });
  }
};

// DELETE /contacts/:id
const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid contact id." });
    }

    const contactId = new ObjectId(id);

    const response = await mongodb
      .getDb()
      .db()
      .collection("contacts")
      .deleteOne({ _id: contactId });

    if (response.deletedCount === 0) {
      return res.status(404).json({ message: "Contact not found." });
    }

    return res.status(200).json({ message: "Contact deleted." });
  } catch (err) {
    console.error("DELETE /contacts/:id error:", err);
    return res
      .status(500)
      .json({ message: "Some error occurred while deleting the contact." });
  }
};

module.exports = {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact,
};
