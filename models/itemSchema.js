const mongoose = require("mongoose")
const itemSchema = mongoose.Schema({
    item:{
        type:String,
        required:true,
    
    }
})
module.exports = mongoose.model("Item" , itemSchema);