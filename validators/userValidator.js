const Joi = require("joi");

// 🔹 Register Validator
const registerSchema = Joi.object({
  username: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid("admin", "teacher", "student").optional()
});

// 🔹 Login Validator
const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required()
});

module.exports = {
  registerSchema,
  loginSchema,
};
