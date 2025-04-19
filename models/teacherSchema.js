const mongoose = require("mongoose");
const User = require("./userSchema")
const teacherSchema = new mongoose.Schema({
    location:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Location'
    }
    

})
module.exports = User.discriminator("Teacher",teacherSchema);