const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/userSchema");

const app = express();
app.use(express.json());

// लॉगिन रूट
router.post("/login", async (req, res) => {
  const { username, password } = req.body; // email -> username
  try {
    const user = await User.findOne({ username }); // email -> username
    if (!user) return res.status(400).json({ message: "Invalid Username" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid Passoerd" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "2d" }
    );

    let redirectTo = "";
    switch (user.role) {
      case "admin":
        redirectTo = "/admin-panel";
        break;
      case "teacher":
        redirectTo = "/teacher-panel";
        break;
      case "student":
        redirectTo = "/student-panel";
        break;
      default:
        redirectTo = "/"; // डिफ़ॉल्ट केस
    }

    res.status(200).json({ token, role: user.role, redirectTo });
    res.header("Authorization", `Bearer ${token}`).json({
      message: "Login successful",
      role: user.role,
      redirectTo: "/student-panel",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// रजिस्टर रूट (अलग रूट के रूप में)
router.post("/register", async (req, res) => {
  const { username, password, role } = req.body; // name/email -> username
  try {
    let user = await User.findOne({ username }); // username पर चेक
    if (user) return res.status(400).json({ message: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
      username,
      password: hashedPassword,
      role: role || "student", // डिफ़ॉल्ट रोल
    });
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "2d" }
    );

    await user.save();

    res.status(201).json({
      token,
      role: user.role,
      message: "Registration successful",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
});

function verifyToken(req, res, next) {
  const token = req.headers["authorization"]; // Expected: "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
    req.user = decoded; // decoded = { id, role }
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

module.exports = verifyToken;

module.exports = router;
