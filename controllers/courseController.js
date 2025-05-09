const { get } = require('mongoose');
const courseService = require('../services/courseService');

// ➕ Add Course
const addCourse = async (req, res) => {
  try {
    const { courseName, duration, courseFee } = req.body;

    if (!courseName || !duration) {
      return res.status(400).json({ message: "courseName and duration are required" });
    }

    // 🔍 Check if the course already exists
    const existingCourse = await courseService.findCourseByName(courseName);
    if (existingCourse) {
      return res.status(409).json({ message: "Course already exists" });
    }

    const course = await courseService.createCourse({ courseName, duration, courseFee });
    res.status(201).json({ message: "Course added", course });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// 📃 Get All Courses
const getCourses = async (req, res) => {
  try {
    const courses = await courseService.getAllCourses();
    res.status(200).json(courses);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// 📃 Get Single Course (by ID)
const getCourse = async (req, res) => {
  try {
    const course = await courseService.getCourseById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✏️ Update Course
const updateCourse = async (req, res) => {
  try {
    const { courseName, duration, courseFee } = req.body;

    if (!courseName || !duration) {
      return res.status(400).json({ message: "courseName and duration are required" });
    }

    const updated = await courseService.updateCourse(req.params.id, { 
      courseName, 
      duration, 
      courseFee 
    });

    if (!updated) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json({ message: "Course updated", updated });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// ❌ Delete Course
const deleteCourse = async (req, res) => {
  try {
    await courseService.deleteCourse(req.params.id);
    res.status(200).json({ message: "Course deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const findByName = async (courseName) => {
  return await Course.findOne({ courseName });
};


// ✅ Export all controllers
module.exports = {
  addCourse,
  getCourses,
  getCourse,
  updateCourse,
  deleteCourse,
  findByName
};
