const Joi = require("joi");
const mongoose = require("mongoose");

const objectId = Joi.string().custom((value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.error("any.invalid");
  }
  return value;
}, "ObjectId Validation");

const createEnquirySchema = Joi.object({
  enquiryType: Joi.string().valid("Direct", "Telephonic", "Online").required(),
  enquiryNo: Joi.string().required(),
  studentName: Joi.string().min(3).required(),
  phone: Joi.string().pattern(/^\d{10,15}$/).required(),
  email: Joi.string().email().required(),
  courseInterest: objectId.allow(null), // optional but if provided, should be valid ObjectId
  city: Joi.string().required(),
  state: Joi.string().required(),
  address: Joi.string().min(5).required(),
  enquiryDetail: Joi.string().min(5).required(),
  status: Joi.string().valid("Pending", "In Progress", "Completed").optional(),
  date: Joi.string().optional(), // optional, default will be set from schema
});

const updateEnquirySchema = Joi.object({
  enquiryType: Joi.string().valid("Direct", "Telephonic", "Online"),
  enquiryNo: Joi.string(),
  studentName: Joi.string().min(3),
  phone: Joi.string().pattern(/^\d{10,15}$/),
  email: Joi.string().email(),
  courseInterest: objectId.allow(null),
  city: Joi.string(),
  state: Joi.string(),
  address: Joi.string().min(5),
  enquiryDetail: Joi.string().min(5),
  status: Joi.string().valid("Pending", "In Progress", "Completed"),
  date: Joi.string(),
}).min(1); // ensure at least one field is being updated

module.exports = {
  createEnquirySchema,
  updateEnquirySchema,
};
