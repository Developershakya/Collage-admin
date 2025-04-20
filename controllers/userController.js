// controllers/userController.js
const userService = require("../services/userService");

const login = async (req, res) => {
  const { username, password } = req.body;
  const result = await userService.loginUser(username, password);

  if (result.error) {
    return res.status(result.status).json({ message: result.error });
  }

  res.cookie("token", result.token, {
    httpOnly: true,
    secure: false, // Set to true in production
    sameSite: "Lax",
  });

  return res.status(200).json({
    message: "Login successful",
    role: result.role,
    redirectTo: result.redirectTo,
  });
};

const register = async (req, res) => {
  const { username, email, password, role } = req.body;
  const result = await userService.registerUser(username, email, password, role);

  if (result.error) {
    return res.status(result.status).json({ message: result.error });
  }

  res.cookie("token", result.token, {
    httpOnly: true,
    secure: false, // Set to true in production
    sameSite: "Lax",
  });

  return res.status(201).json({
    message: "Registration successful",
    role: result.role,
  });
};

const logout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
};

const checkAuth = (req, res) => {
  res.status(200).json({
    isAuthenticated: true,
    user: req.user, // populated by authMiddleware
  });
};

module.exports = { login, register, logout, checkAuth };
