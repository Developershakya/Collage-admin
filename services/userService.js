const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "2d" }
  );
};

const loginUser = async (username, password) => {
  try {
    const user = await User.findOne({ username });
    if (!user) return { error: "Invalid Username", status: 400 };

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return { error: "Invalid Password", status: 400 };

    const token = generateToken(user);

    let redirectTo = "/";
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
    }

    return { token, role: user.role, redirectTo };
  } catch (err) {
    console.error(err.message);
    return { error: "Server error", status: 500 };
  }
};

const registerUser = async (username, email,password, role = "student") => {
  try {
    let existingUser = await User.findOne({ username });
    if (existingUser) return { error: "User already exists", status: 400 };

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      username,
      email,
      password: hashedPassword,
      role,
    });

    await user.save();

    const token = generateToken(user);
    return { token, role: user.role };
  } catch (err) {
    console.error(err.message);
    return { error: "Server error", status: 500 };
  }
};

module.exports = { loginUser, registerUser };
