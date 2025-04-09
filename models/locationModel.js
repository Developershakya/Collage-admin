const mongoose = require('mongoose')
const locationModel = new mongoose.Schema({
 loc:{
    type:String
 }
});
export const Location = mongoose.model("Location","locationModel");