
// models/Student.js
const StudentSchema = new mongoose.Schema({
    eno: {
      type:String,
      required:true,
      unique:true,
    },
    sessn: {
      type:mongoose.Schema.Types.ObjectId,
      ref:'Session',
      require:true,
    },
    enrlmdate: Date,
    studnm: {
      type:String,
      require:true,

    },
    fathrnm:  {
      type:String,
      require:true,

    },
    mothrnm:  {
      type:String,
      require:true,

    },
    dob: {
      type:String,
      require:true,

    },
    fathroccp: {
      type:String,
      require:true,

    },
    gendr: { type: String, enum: ['Male', 'Female', 'None'] ,require:true},
    addr: {
      type:String,
      require:true,

      pemaddr: {
    },
      type:String,
      require:true,

    }
    phone: {
      type:String,
      require:true,

    },
    stcast: {
      type:String,
      require:true,

    },
    strelgn: {
      type:String,
      require:true,

    },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    discount: { type: Number, default: 0 },
    remark: String,
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
    user:{
      type:mongoose.schema.Types.ObjectId,
      ref:''
    }
  }, { timestamps: true });
  module.exports = mongoose.model('Student', StudentSchema);