const stdService = require('../services/stdService');

// ➕ Add Student
exports.addStudent = async (req, res) => {
  try {
    const student = await stdService.createStudent(req.body);
    res.status(201).json({ message: "Student added", student });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 📃 Get All Students
exports.getStudents = async (req, res) => {
  try {
    const students = await stdService.getAllStudents();
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔍 Get Student by ID
exports.getStudent = async (req, res) => {
  try {
    const student = await stdService.getStudentById(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.status(200).json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✏️ Update Student
exports.updateStudent = async (req, res) => {
  try {
    const updated = await stdService.updateStudent(req.params.id, req.body);
    res.status(200).json({ message: "Student updated", updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ❌ Delete Student
exports.deleteStudent = async (req, res) => {
  try {
    await stdService.deleteStudent(req.params.id);
    res.status(200).json({ message: "Student deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
