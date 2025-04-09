routes/
├── adminRoutes.js        // Protected by auth + role: admin
├── teacherRoutes.js      // Protected by auth + role: teacher
├── studentRoutes.js      // Protected by auth + role: student
├── auth.js               // No protection needed (login, signup)
middleware/
├── authMiddleware.js
├── roleMiddleware.js


axios.get("http://localhost:5000/api/dashboard", {
  headers: {
    Authorization: `Bearer ${token}`  // 👈 Insert token in header
  }
});



const token = req.headers["authorization"]; // "Bearer token"
const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
