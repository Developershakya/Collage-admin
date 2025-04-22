const Student = require('../models/stdSchema');

module.exports.createStudent = async (data) => {
  return await Student.create(data);
};

module.exports.getAllStudents = async () => {
  return await Student.find().populate('course items');
};

module.exports.getStudentById = async (id) => {
  return await Student.findById(id).populate('course items');
};

module.exports.updateStudent = async (id, data) => {
  return await Student.findByIdAndUpdate(id, data, { new: true });
};

module.exports.deleteStudent = async (id) => {
  return await Student.findByIdAndDelete(id);
};
