const mongoose = require('mongoose')
const locationSchema = new mongoose.Schema({
 loc:{
    type:String,
    required:true,
    unique:true,
 }
});
module.exports = mongoose.model("Location",locationSchema);