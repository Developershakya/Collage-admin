const mongoose = require("mongoose")
const Location = require("../models/locationModel")

const createLocation = async (data) =>{
    return await Location.create(data);

}
const getAllLocation = async ()=>{
    return await Location.find();
}
const deleteLocation = async () =>{
    return await Location.findByIdAndDelete(id)
}
module.exports ={
    createLocation,
    getAllLocation,
    deleteLocation,
}