
// models/Student.js
const StudentSchema = new mongoose.Schema({
    eno: String,
    sessn: {
      type:mongoose.Schema.Types.ObjectId,
      ref:'Session',
    },
    enrlmdate: Date,
    studnm: String,
    fathrnm: String,
    mothrnm: String,
    dob: Date,
    fathroccp: String,
    gendr: { type: String, enum: ['M', 'F', 'O'] },
    addr: String,
    pemaddr: String,
    phone: String,
    stcast: String,
    strelgn: String,
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    discount: { type: Number, default: 0 },
    remark: String,
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
    user: String
  }, { timestamps: true });
  module.exports = mongoose.model('Student', StudentSchema);