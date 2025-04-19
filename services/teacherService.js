const mongoose = require("mongoose");
const Teacher = require("../models/teacherSchema")
const createTeacher = async (data) =>{
    return await Teacher.create(data);
}
const updateTeacher = async (id , data) =>{
    return await Teacher.findByIdAndUpdate(id , data, {new:true});
}
const deleteTeacher = async (id) =>{
    return await Teacher.findByIdAndDelete(id);
}

module.exports ={
    createTeacher,
    updateTeacher,
    deleteTeacher,
}