const Enquiry = require("../models/enquirySchema");

const createEnquiry = async (data) => {
    return await Enquiry.create(data);
};

const getAllEnquiries = async () => {
    return await Enquiry.find().sort({ createdAt: -1 });
};

const getEnquiryById = async (id) => {
    return await Enquiry.findById(id);
};

const updateEnquiry = async (id, data) => {
    return await Enquiry.findByIdAndUpdate(id, data, { new: true });
};

const deleteEnquiry = async (id) => {
    return await Enquiry.findByIdAndDelete(id);
};

module.exports = {
    createEnquiry,
    getAllEnquiries,
    getEnquiryById,
    updateEnquiry,
    deleteEnquiry
};
