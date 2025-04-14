const express = require("express");
const router = express.Router();
const enquiryController = require("../controllers/enquiryController");
const validate = require("../middlewares/validate");
const {
  createEnquirySchema,
  updateEnquirySchema
} = require("../validators/enquiryValidator");

// ✅ Routes with validation
router.post("/", validate(createEnquirySchema), enquiryController.createEnquiry);
router.put("/:id", validate(updateEnquirySchema), enquiryController.updateEnquiry);

// ✅ Other routes
router.get("/", enquiryController.getAllEnquiries);
router.get("/:id", enquiryController.getEnquiryById);
router.delete("/:id", enquiryController.deleteEnquiry);

module.exports = router;
