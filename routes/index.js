const express = require("express");
const router = express.Router();

router.get("/", (req, res) => res.status(200).send("API is running"));

// Contacts API
router.use("/contacts", require("./contacts"));

// Professional profile API
router.use("/professional", require("./professional"));

module.exports = router;
