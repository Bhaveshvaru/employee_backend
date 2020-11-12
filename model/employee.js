const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema(
  {
      
    employeename: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      
    },
    employeeaddress:{
        type:String,
        required: true,
        trim: true,
        lowercase: true,
    }, 
    email:{
        type:String,
        unique:true,
        required: true,
        trim: true,
        lowercase: true,
    },
    dateofbirth:{
        type: Date,
        required: true,
        max: Date.now,
        },
    phone:{
        type:Number,
        required:true,
        trim:true
    },
    bio:{
        type:String,
        required:true
    } ,
   photo: 
    { 
       type:String,
       required:true
    } 
  }

);
module.exports = mongoose.model('EmployeeData', employeeSchema); 