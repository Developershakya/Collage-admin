const express = require("express");
const {
  addCourse,
  getCourses,
  updateCourse,
  deleteCourse
} = require("../controllers/courseController");

const validate = require("../middlewares/validate");
const {
  createCourseSchema,
  updateCourseSchema
} = require("../validators/courseValidator");

const router = express.Router();

router.post("/add", validate(createCourseSchema), addCourse);           // ➕ Create
router.get("/", getCourses);                                            // 📃 Read all
router.put("/update/:id", validate(updateCourseSchema), updateCourse); // ✏️ Update
router.delete("/delete/:id", deleteCourse);                             // ❌ Delete

module.exports = router;
