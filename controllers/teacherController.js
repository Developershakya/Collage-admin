const teacherService = require("../services/teacherService");

const createTeacher = async (req, res) => {
  try {
    const teacher = await teacherService.createTeacher(req.body);
    res.status(201).json({ message: "Teacher created", teacher });
  } catch (error) {
    console.error("❌ Error creating teacher:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

const getAllTeachers = async (req, res) => {
  try {
    const teachers = await teacherService.getAllTeachers();
    res.status(200).json(teachers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateTeacher = async (req, res) => {
  try {
    const updated = await teacherService.updateTeacher(req.params.id, req.body);
    if (!updated)
      return res.status(404).json({ message: "Teacher not found" });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteTeacher = async (req, res) => {
  try {
    const deleted = await teacherService.deleteTeacher(req.params.id);
    if (!deleted)
      return res.status(404).json({ message: "Teacher not found" });
    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createTeacher,
  getAllTeachers,
  updateTeacher,
  deleteTeacher,
};
