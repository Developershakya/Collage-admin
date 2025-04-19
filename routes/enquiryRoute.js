const express = require("express");
const router = express.Router();
const enquiryController = require("../controllers/enquiryController");
const validate = require("../middlewares/validate");
const {
  createEnquirySchema,
  updateEnquirySchema,
  
} = require("../validators/enquiryValidator");


// ✅ Routes with validation
router.post("/createenquiry", enquiryController.createEnquiry);
router.get("/getEnquiryNo" , enquiryController.getNextEnquiryNo);
router.put("/updatestatus/:enquiryNo",  enquiryController.updateEnquiry);
 
// ✅ Other routes
router.get("/getallenquiries", enquiryController.getAllEnquiries);
router.get("/getenquiriesbyenquiryNo/:enquiryNo", enquiryController.getEnquiryByenquiryNo);
router.get("/getenquiriesbyenquiryNo/:editEnquiryNo", enquiryController.getEnquiryByenquiryNo);
router.delete("/:id", enquiryController.deleteEnquiry);


module.exports = router;
