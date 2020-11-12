const Employee = require("../model/employee");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const path = require('path');
const shortid = require('shortid');

//create Employee controller
exports.createEmployee=(req,res)=>{
  const {employeename,employeeaddress,email,dateofbirth,phone,bio } = req.body;
  if(!employeename || !employeeaddress || !email || !dateofbirth || !phone || !bio){
   return res.status(400).json({message:"Please enter all fields!"})
  }

  const file = req.files.photo
  if(!file)
  {
      res.status(400).json({message:"File was not found"});
      return;
  }
  // Create custom filename
  //console.log("files",file)

  let shortId=shortid.generate()
  file.name = `photo_${shortId}_${file.name}`;

  file.mv(`uploads/${file.name}`, async err => {
    if (err) {
      console.error(err);
      return res.status(500).json({message:"problem with image"})
    }
  let photo=file.name;//.file
 

  const employee = new Employee({
    employeename,employeeaddress,email,dateofbirth,phone,bio,
    photo
  });
 
  employee.save((error, data) => {
    if (error) return res.status(400).json(error);
    if (data) {
      res.status(201).json({ msg:"employee added successfully!",data,
    });  
    }
  });
});




}

  //get Controller
  exports.getAllemployee = (req, res,next) => {
    Employee.find()
      .exec((err, data) => {
        if (err) {
          return res.status(400).json({
            error: "No Record for Found"
          });
        }
        const result = data.reverse();
        return res.status(200).json(result);
      });
  };