const Enquiry = require("../models/enquirySchema");

const createEnquiry = async (data) => {
  return await Enquiry.create(data);
};

const getAllEnquiries = async () => {
  return await Enquiry.find().sort({ createdAt: -1 });
};

const getEnquiryByenquiryNo = async (enquiryNo) => {
  return await Enquiry.findOne(enquiryNo);
};

const updateEnquiry = async (enquiryNo, data) => {
  return await Enquiry.findOneAndUpdate(
    { enquiryNo },
    { $set: data },
    { new: true }
  );
};

const deleteEnquiry = async (id) => {
  return await Enquiry.findByIdAndDelete(id);
};

module.exports = {
  createEnquiry,
  getAllEnquiries,
  getEnquiryByenquiryNo,
  updateEnquiry,
  deleteEnquiry,
};
