import courseService from '../services/courseService.js';

// ➕ Add Course
export const addCourse = async (req, res) => {
  try {
    const { courseName, fee } = req.body;
    if (!courseName || !fee) {
      return res.status(400).json({ message: "courseName and fee are required" });
    }
    const course = await courseService.createCourse({ courseName, fee });
    res.status(201).json({ message: "Course added", course });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 📃 Get All Courses
export const getCourses = async (req, res) => {
  try {
    const courses = await courseService.getAllCourses();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✏️ Update Course
export const updateCourse = async (req, res) => {
  try {
    const { courseName, fee } = req.body;
    const updated = await courseService.updateCourse(req.params.id, { courseName, fee });
    res.status(200).json({ message: "Course updated", updated });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ❌ Delete Course
export const deleteCourse = async (req, res) => {
  try {
    await courseService.deleteCourse(req.params.id);
    res.status(200).json({ message: "Course deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
