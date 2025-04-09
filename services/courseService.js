const Course = require('../models/courseModel');

const createCourse = async (data) => {
  const newCourse = new Course(data);
  return await newCourse.save();
};

const getAllCourses = async () => {
  return await Course.find();
};

const updateCourse = async (id, data) => {
  return await Course.findByIdAndUpdate(id, data, { new: true });
};

const deleteCourse = async (id) => {
  return await Course.findByIdAndDelete(id);
};

module.exports = {
  createCourse,
  getAllCourses,
  updateCourse,
  deleteCourse,
};
