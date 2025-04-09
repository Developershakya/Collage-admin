const Student = require('../models/Student');

exports.createStudent = async (data) => {
  return await Student.create(data);
};

exports.getAllStudents = async () => {
  return await Student.find().populate('course items');
};

exports.getStudentById = async (id) => {
  return await Student.findById(id).populate('course items');
};

exports.updateStudent = async (id, data) => {
  return await Student.findByIdAndUpdate(id, data, { new: true });
};

exports.deleteStudent = async (id) => {
  return await Student.findByIdAndDelete(id);
};
