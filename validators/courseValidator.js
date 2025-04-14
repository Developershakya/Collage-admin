const Joi = require("joi");

// 🔹 Validator for Add Course
const createCourseSchema = Joi.object({
  courseName: Joi.string().min(2).required(),
  fee: Joi.number().min(0).required()
});

// 🔹 Validator for Update Course
const updateCourseSchema = Joi.object({
  courseName: Joi.string().min(2).optional(),
  fee: Joi.number().min(0).optional()
});

module.exports = {
  createCourseSchema,
  updateCourseSchema,
};
