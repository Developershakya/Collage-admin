const express = require("express");
const router = express.Router();
const enquiryController = require("../controllers/enquiryController");

router.post("/createenquiry", enquiryController.createEnquiry);
router.get("/getallenquiries", enquiryController.getAllEnquiries);
router.get(
  "/getenquiriesbyenquiryNo/:enquiryNo",
  enquiryController.getEnquiryByenquiryNo
);
router.put("/updateenquirybyid/:id", enquiryController.updateEnquiry);
router.delete("/deleteenquirybyid/:id", enquiryController.deleteEnquiry);

module.exports = router;
