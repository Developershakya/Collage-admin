const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const validate = require("../middlewares/validate");
const authMiddleware = require("../middlewares/authMiddleware");
const { registerSchema, loginSchema } = require("../validators/userValidator");

// ✅ Login & Register
router.post("/login", validate(loginSchema), userController.login);
router.post("/register", validate(registerSchema), userController.register);

// ✅ Logout
router.post("/logout", userController.logout);

// ✅ Check Auth (for frontend to verify login session)
router.get("/check-auth", authMiddleware, userController.checkAuth);

module.exports = router;
