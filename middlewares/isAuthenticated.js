const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = function (req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ isAuthenticated: false });

  try {
    // Verify the token and decode the payload
    const decoded = jwt.verify(token, JWT_SECRET);

    // Now, both userId and username are available
    req.userId = decoded.id;
    req.username = decoded.username;  // Add username to the request object

    next();
  } catch (err) {
    res.status(401).json({ isAuthenticated: false });
  }
};
