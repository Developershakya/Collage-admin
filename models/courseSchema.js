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
  isFeePaid:{
    type:Boolean,
    default:false,
  }
});

module.exports= mongoose.model('Course', courseSchema);
