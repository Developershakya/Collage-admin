const mongoose = require("mongoose");
// const User = require("./userSchema")
const teacherSchema = new mongoose.Schema({
    
    TeacherName:{
        type:String,
        required:true,
    },
TeacherSalary:{
    type:Number,
    required:true,
    },
    TeacherCourse:{
        type:String,
        required:true,
    },
    location:{
        type:String,
        required:true,
    },
    

})
module.exports = mongoose.model("Teacher",teacherSchema);