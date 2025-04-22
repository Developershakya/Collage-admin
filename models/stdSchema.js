const mongoose = require("mongoose");

// models/Student.js
const StudentSchema = mongoose.Schema({
  eno: {
    type: String,
    required: true,
    unique: true,
  },
  sessn: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Session',
    required: true,  // corrected "require" to "required"
  },
  enrlmdate: Date,
  studnm: {
    type: String,
    required: true,  // corrected "require" to "required"
  },
  fathrnm: {
    type: String,
    required: true,  // corrected "require" to "required"
  },
  mothrnm: {
    type: String,
    required: true,  // corrected "require" to "required"
  },
  dob: {
    type: String,
    required: true,  // corrected "require" to "required"
  },
  fathroccp: {
    type: String,
    required: true,  // corrected "require" to "required"
  },
  gendr: {
    type: String,
    enum: ['Male', 'Female', 'None'],
    required: true,  // corrected "require" to "required"
  },
  addr: {
    type: String,
    required: true,  // corrected "require" to "required"
  },
  pemaddr: {
    type: String,
    required: true,  // corrected "require" to "required"
  },
  phone: {
    type: String,
    required: true,  // corrected "require" to "required"
  },
  stcast: {
    type: String,
    required: true,  // corrected "require" to "required"
  },
  strelgn: {
    type: String,
    required: true,  // corrected "require" to "required"
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
  },
  discount: {
    type: Number,
    default: 0,
  },
  remark: String,
  items: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
  }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: '',  // You should specify the reference model here, such as 'User'
  },
}, { timestamps: true });

module.exports = mongoose.model('Student', StudentSchema);
