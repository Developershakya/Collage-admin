const express = require("express");
const connectDB = require('./config/database'); 
const dotenv = require("dotenv");
const cors = require('cors');
const userRoute = require('./routes/userRoute');
const courseRoute = require('./routes/courseRoute');
const authMiddleware = require("./middleware/authMiddleware");
const roleMiddleware = require("./middleware/roleMiddleware");

dotenv.config();
const app = express();

// ✅ CORS setup
app.use(cors({
  origin: "http://localhost:5173", // ✅ only domain + port
  credentials: true,
}));

// ✅ Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ DB Connect
connectDB();

// ✅ Routes
app.use('/', userRoute); // for /login & /register
app.use('/teacher-panel/addcourse', courseRoute);

// ✅ Protected Routes
app.get("/admin-panel", authMiddleware, roleMiddleware(["admin"]), (req, res) => {
  res.send("Welcome to Admin Panel");
});

app.get("/teacher-panel", authMiddleware, roleMiddleware(["teacher"]), (req, res) => {
  res.send("Welcome to Teacher Panel");
});

app.get("/student-panel", authMiddleware, roleMiddleware(["student"]), (req, res) => {
  res.send("Welcome to Student Panel");
});

// ✅ Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
