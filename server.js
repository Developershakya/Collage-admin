// server.js
const express = require("express");
const connectDB = require('./config/database'); 
const authRoutes = require('./routes/auth')
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const courseRoute = require('./routes/courseRoute')

const authMiddleware = require("./middleware/authMiddleware");
const roleMiddleware = require("./middleware/roleMiddleware");

dotenv.config();
const app = express();
express.urlencoded({ extended: true })
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/teacher-panel/addcourse', courseRoute);

// DB Connect
connectDB();

PORT = process.env.PORT
// mongoose.connect(process.env.MONGO_URI, () => {
//   console.log("MongoDB connected");
// });

// Protected Routes
app.get("/admin-panel", authMiddleware, roleMiddleware(["admin"]), (req, res) => {
  res.send("Welcome to Admin Panel");
});

app.get("/teacher-panel", authMiddleware, roleMiddleware(["teacher"]), (req, res) => {
  res.send("Welcome to Teacher Panel");
});

app.get("/student-panel", authMiddleware, roleMiddleware(["student"]), (req, res) => {
  res.send("Welcome to Student Panel");
});
app.listen(PORT,() =>{
    console.log(`server run at port ${PORT}`)
})
