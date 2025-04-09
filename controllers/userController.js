const mongoose = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../models/userSchema.js")
const register = async (req,res)=>{
    try{
        const {username , password ,role} =req.body;
        if(!username || !password || !role){
            return res.status(400).json({message:"All fields are required"});

        }
        const user
    }
}