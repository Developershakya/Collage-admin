const Student = require("../models/stdSchema");
const Counter = require("../models/counterSchema");

const stdService = require("../services/stdService");
exports.addStudent = async (req, res) => {
  try {
    let counter = await Counter.findById("enrollmentNo");
    if (!counter) {
      counter = await Counter.create({
        _id: "enrollmentNo",
        sequence_value: 0,
      });
    }

    counter.sequence_value += 1;
    await counter.save();

    const enrollmentNo = `Enrolment${String(counter.sequence_value).padStart(
      6,
      "0"
    )}`;

    const studentData = { ...req.body, enrollmentNo };
    const newStudent = new Student(studentData);
    await newStudent.save();

    res.status(201).json({
      message: "Student added successfully",
      student: {
        ...newStudent._doc,
        enrollmentNo,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message || "Server error" });
  }
};

exports.getStudentByEnrollment = async (req, res) => {
  try {
    const student = await Student.findOne({
      enrollmentNo: req.params.enrollmentNo,
    });
    console.log(student);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json(student);
  } catch (err) {
    res.status(500).json({ error: err.message || "Server error" });
  }
};

// 📃 Get All Students
exports.getStudents = async (req, res) => {
  try {
    const students = await stdService.getAllStudents();
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ error: err.message || "Server error" });
  }
};

// 🔍 Get Student by ID
exports.getStudent = async (req, res) => {
  try {
    const student = await stdService.getStudentById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json(student);
  } catch (err) {
    res.status(500).json({ error: err.message || "Server error" });
  }
};

// ✏️ Update Student
exports.updateStudent = async (req, res) => {
  try {
    const updatedStudent = await stdService.updateStudent(
      req.params.id,
      req.body
    );
    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }
    res
      .status(200)
      .json({ message: "Student updated successfully", updatedStudent });
  } catch (err) {
    res.status(500).json({ error: err.message || "Server error" });
  }
};

// ❌ Delete Student
exports.deleteStudent = async (req, res) => {
  try {
    const deletedStudent = await stdService.deleteStudent(req.params.id);
    if (!deletedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json({ message: "Student deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message || "Server error" });
  }
};
