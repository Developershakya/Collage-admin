// models/Course.js
const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  courseFee: {
    type: Number,
    required: true,
  },
});

module.exports= mongoose.model('Course', courseSchema);
