const enquiryService = require("../services/enquiryService");
const Enquiry = require("../models/enquirySchema");
const createEnquiry = async (req, res) => {
  try {
    console.log("📥 Incoming enquiry data:", req.body);

    const enquiry = await enquiryService.createEnquiry(req.body);

    res.status(201).json({ message: "Enquiry created successfully", enquiry });
  } catch (error) {
    console.error("❌ Error creating enquiry:", error);

    if (error.name === "ValidationError") {
      return res
        .status(400)
        .json({ message: "Validation Error", error: error.message });
    }

    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};



const getAllEnquiries = async (req, res) => {
  try {
    const enquiries = await enquiryService.getAllEnquiries();
    res.status(200).json(enquiries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getEnquiryByenquiryNo = async (req, res) => {
  try {
    const enquiryNo = req.params.enquiryNo.trim();
    const enquiry = await enquiryService.getEnquiryByenquiryNo({ enquiryNo });
    if (!enquiry) return res.status(404).json({ error: "Enquiry not found" });
    res.status(200).json(enquiry);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateEnquiry = async (req, res) => {
  try {
    const enquiryNo  = req.params.enquiryNo;
    const updated = await enquiryService.updateEnquiry(enquiryNo, req.body);
    if (!updated) return res.status(404).json({ error: "Enquiry not found" });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteEnquiry = async (req, res) => {
  try {
    const deleted = await enquiryService.deleteEnquiry(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Enquiry not found" });
    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getNextEnquiryNo = async (req, res) => {
  try {
    const latest = await Enquiry.findOne().sort({ enquiryNoRaw: -1 });
    const nextRaw = latest ? latest.enquiryNoRaw + 1 : 1;
    const nextEnquiryNo = `ENQ${String(nextRaw).padStart(10, "0")}`;

    res.status(200).json({ enquiryNoRaw: nextRaw, enquiryNo: nextEnquiryNo });
  } catch (err) {
    res.status(500).json({ message: "Failed to get next enquiry number" });
  }
};

module.exports = {
  createEnquiry,
  getAllEnquiries,
  getEnquiryByenquiryNo,
  updateEnquiry,
  deleteEnquiry,
  getNextEnquiryNo,
};
