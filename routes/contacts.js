const express = require("express");
const router = express.Router();

const contactsController = require("../controllers/contacts");

router.get("/", contactsController.getAll);
router.get("/:id", contactsController.getById);
router.post("/", contactsController.createContact);
router.put("/:id", contactsController.updateContactById);
router.delete("/:id", contactsController.deleteContactById);

module.exports = router;
