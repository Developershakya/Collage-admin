const mongoose = require('mongoose')
const locationSchema = new mongoose.Schema({
 loc:{
    type:String,
    required:true
 }
});
export const Location = mongoose.model("Location",locationSchema);