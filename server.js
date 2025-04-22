const express = require("express");
const connectDB = require("./config/database");
const dotenv = require("dotenv");
const cors = require("cors");
const userRoute = require("./routes/userRoute");
const courseRoute = require("./routes/courseRoute");
const enquiryRoutes = require("./routes/enquiryRoute");
const authMiddleware = require("./middlewares/authMiddleware");
const roleMiddleware = require("./middlewares/roleMiddleware");
const locationRoutes = require("./routes/locationRoute")
const cookieParser = require("cookie-parser");
const User = require("./models/userSchema");
const isAuthenticated = require("./middlewares/isAuthenticated");
const stdRoutes = require("./routes/stdRouter")
const itemRoutes = require("./routes/itemRoutes")
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
app.use(cookieParser());

// ✅ DB Connect
connectDB();

// ✅ Routes

app.use("/", userRoute); // for /login & /register
app.use("/admin",  itemRoutes);
app.use("/admin/courses", courseRoute);
app.use("/admin/students" , stdRoutes);
app.use("/admin/enquiries", enquiryRoutes);
app.use("/admin/managelocaiton", locationRoutes);


app.get("/check-auth",  async (req, res) => {

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
