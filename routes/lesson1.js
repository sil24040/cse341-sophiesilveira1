const express = require("express");
const router = express.Router();

const lesson1Controller = require("../controllers/lesson1");

// Root
router.get("/", (req, res) => res.send("API is running"));

// Example name routes
router.get("/tomclancy", lesson1Controller.routeTomClancy);
router.get("/jackryan", lesson1Controller.routeJackRyan);
router.get("/johnclark", lesson1Controller.routeJohnClark);

// Optional personal routes (if your .rest uses /IvanRibeiro etc)
router.get("/SophieSilveira", lesson1Controller.routeSophieSilveira);
router.get("/IvanRibeiro", lesson1Controller.routeIvanRibeiro);
router.get("/RosaSilveira", lesson1Controller.routeRosaSilveira);

module.exports = router;
