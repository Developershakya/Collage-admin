// backend/routes/auth.js

const express = require("express");
const router = express.Router();
const User = require("../models");
const isAuthenticated = require("../middlewares/isAuthenticated");

router.get("/check-auth", isAuthenticated, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("username email role");
    if (!user) {
      return res.status(401).json({ isAuthenticated: false });
    }

    res.json({
      isAuthenticated: true,
      user, // 👈 returns { username: "YourName", ... }
    });
  } catch (err) {
    res.status(500).json({ isAuthenticated: false });
  }
});

module.exports = router;
