const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const validate = require("../middlewares/validate");
const { registerSchema, loginSchema } = require("../validators/userValidator");

router.post("/login", validate(loginSchema), userController.login);
router.post("/register", validate(registerSchema), userController.register);

module.exports = router;
