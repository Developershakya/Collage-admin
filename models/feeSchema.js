const { required } = require("joi")
const mongoose = require("mongoose")
const feeSchema = mongoose.Schema({
    courseId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Course'
    },
    fees:{
        type:String,
        required:true
    }
})
module.exports = mongoose.model("Fees" , feeSchema);