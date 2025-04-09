// models/Course.js
const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: true,
  },
  fee: {
    type: Number,
    required: true,
  },
});

module.exports= mongoose.model('Course', courseSchema);
