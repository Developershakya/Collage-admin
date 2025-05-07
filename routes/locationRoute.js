const express = require("express");
const router = express.Router();
const locationController = require("../controllers/locationController");

// POST route to create location
router.post("/", locationController.createLocation);

// Other routes...
router.get("/", locationController.getAllLocation);
router.put("/:id", locationController.updateLocation);
router.delete("/:id", locationController.deleteLocation);

module.exports = router;
