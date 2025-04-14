const express = require("express");
const connectDB = require("./config/database");
const dotenv = require("dotenv");
const cors = require("cors");
const userRoute = require("./routes/userRoute");
const courseRoute = require("./routes/courseRoute");
const enquiryRoutes = require("./routes/enquiryRoute");
const authMiddleware = require("./middlewares/authMiddleware");
const roleMiddleware = require("./middlewares/roleMiddleware");

const app = express();
dotenv.config();

// ✅ CORS setup
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],

    credentials: true,
  })
);

// ✅ Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ DB Connect
connectDB();

// ✅ Routes
<<<<<<< HEAD
app.use('/', userRoute); // for /login & /register
app.use('/admin/Courses', courseRoute);
=======
app.use("/", userRoute); // for /login & /register
app.use("/admin/addcourse", courseRoute);
>>>>>>> 44d500008fbe6b1bc515f292a4e36199dd17ea77
app.use("/admin/enquiries", enquiryRoutes);

// ✅ Protected Routes
app.get(
  "/admin-panel",
  authMiddleware,
  roleMiddleware(["admin"]),
  (req, res) => {
    res.send("Welcome to Admin Panel");
  }
);

app.get(
  "/teacher-panel",
  authMiddleware,
  roleMiddleware(["teacher"]),
  (req, res) => {
    res.send("Welcome to Teacher Panel");
  }
);

app.get(
  "/student-panel",
  authMiddleware,
  roleMiddleware(["student"]),
  (req, res) => {
    res.send("Welcome to Student Panel");
  }
);

// ✅ Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
