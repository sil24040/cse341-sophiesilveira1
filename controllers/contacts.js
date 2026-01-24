const { ObjectId } = require("mongodb");
const mongodb = require("../db/connect");

const requiredFieldsPresent = (body) => {
  return (
    body &&
    typeof body.firstName === "string" &&
    body.firstName.trim() !== "" &&
    typeof body.lastName === "string" &&
    body.lastName.trim() !== "" &&
    typeof body.email === "string" &&
    body.email.trim() !== "" &&
    typeof body.favoriteColor === "string" &&
    body.favoriteColor.trim() !== "" &&
    typeof body.birthday === "string" &&
    body.birthday.trim() !== ""
  );
};

const getAll = async (req, res) => {
  try {
    const db = mongodb.getDb();
    const result = await db.collection("contacts").find().toArray();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message || "Error fetching contacts" });
  }
};

const getSingle = async (req, res) => {
  try {
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid contact id" });
    }

    const db = mongodb.getDb();
    const contact = await db
      .collection("contacts")
      .findOne({ _id: new ObjectId(id) });

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.status(200).json(contact);
  } catch (err) {
    res.status(500).json({ message: err.message || "Error fetching contact" });
  }
};

const createContact = async (req, res) => {
  try {
    const body = req.body;

    if (!requiredFieldsPresent(body)) {
      return res.status(400).json({
        message:
          "All fields are required: firstName, lastName, email, favoriteColor, birthday",
      });
    }

    const newContact = {
      firstName: body.firstName.trim(),
      lastName: body.lastName.trim(),
      email: body.email.trim(),
      favoriteColor: body.favoriteColor.trim(),
      birthday: body.birthday.trim(),
    };

    const db = mongodb.getDb();
    const response = await db.collection("contacts").insertOne(newContact);

    // RUBRIC: Return new id + 201
    res.status(201).json({ id: response.insertedId.toString() });
  } catch (err) {
    res.status(500).json({ message: err.message || "Error creating contact" });
  }
};

const updateContact = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid contact id" });
    }

    if (!requiredFieldsPresent(body)) {
      return res.status(400).json({
        message:
          "All fields are required: firstName, lastName, email, favoriteColor, birthday",
      });
    }

    const updatedContact = {
      firstName: body.firstName.trim(),
      lastName: body.lastName.trim(),
      email: body.email.trim(),
      favoriteColor: body.favoriteColor.trim(),
      birthday: body.birthday.trim(),
    };

    const db = mongodb.getDb();
    const response = await db.collection("contacts").replaceOne(
      { _id: new ObjectId(id) },
      updatedContact
    );

    if (response.matchedCount === 0) {
      return res.status(404).json({ message: "Contact not found" });
    }

    // RUBRIC: 204 on success
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message || "Error updating contact" });
  }
};

const deleteContact = async (req, res) => {
  try {
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid contact id" });
    }

    const db = mongodb.getDb();
    const response = await db
      .collection("contacts")
      .deleteOne({ _id: new ObjectId(id) });

    if (response.deletedCount === 0) {
      return res.status(404).json({ message: "Contact not found" });
    }

    // RUBRIC: 200 on success
    res.status(200).json({ message: "Contact deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message || "Error deleting contact" });
  }
};

module.exports = {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact,
};
