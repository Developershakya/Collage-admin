const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token; // ⬅️ Getting token from cookie

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided.", isAuthenticated: false });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token using secret key
    req.user = decoded; // Attach user info
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid token.", isAuthenticated: false });
  }
};

module.exports = authMiddleware;
