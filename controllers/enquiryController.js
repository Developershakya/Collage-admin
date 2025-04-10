const enquiryService = require("../services/enquiryService");

const createEnquiry = async (req, res) => {
    try {
        const enquiry = await enquiryService.createEnquiry(req.body);
        res.status(201).json(enquiry);
    } catch (error) {
        res.status(500).json({ error: error.message });
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

const getEnquiryById = async (req, res) => {
    try {
        const enquiry = await enquiryService.getEnquiryById(req.params.id);
        if (!enquiry) return res.status(404).json({ error: "Enquiry not found" });
        res.status(200).json(enquiry);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateEnquiry = async (req, res) => {
    try {
        const updated = await enquiryService.updateEnquiry(req.params.id, req.body);
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

module.exports = {
    createEnquiry,
    getAllEnquiries,
    getEnquiryById,
    updateEnquiry,
    deleteEnquiry
};
