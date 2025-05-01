const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  fatherName: { type: String, required: true },
  motherName: { type: String, required: true },
  dob: { type: Date, required: true },
  occupation: { type: String, required: true },
  gender: { type: String, required: true },
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  contactNo: { type: String, required: true },
  category: { type: String, required: true },
  religion: { type: String, required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  remark: { type: String },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  enrollmentNo: { type: String, unique: true },  // Add this line to store the enrollment number
  enrolmentDate: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);
