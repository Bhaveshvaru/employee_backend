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
  if(!req.files)
  {
      res.status(400).json({message:"Image was not found"});
      return;
  }

  const file = req.files.photo
  
  if(file.mimetype !== 'image/jpeg')
  {
    res.status(400).json({message:"Please upload proper image!"});
    return;
  }
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
    
      if(error !== null){
        if(error.code === 11000){
          return res.status(400).json({message:"Email already Exists!"});
        }
        if( error.errors.phone && error.errors.phone.reason.code === "ERR_ASSERTION"){
         return res.status(400).json({message:"Please Input number in Phone Field."});
       }
       if( error.errors.dateofbirth && error.errors.dateofbirth.properties.type==="max")
       {
        return res.status(400).json({message:"Future date are not Valid.Please add Proper date."});
       }
      }
      
     if(error) return res.status(400).json({message:"something went wrong!",error});

      if (data) {
        res.status(201).json({ message:"employee added successfully!",data,
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
            error: "No Record Found"
          });
        }
        const result = data.reverse();
        return res.status(200).json(result);
      });
  };

   //search employee by ID controller
   exports.getEmployeeById=(req,res,next)=>{
    const id= req.params.id;
    Employee.findById(id)
    .exec((error,data)=>{
    if (error) return res.status(400).json({ error });
    if(data)  res.status(201).json({data,
   }); 

  })
  }

    //delete employee controller
exports.deleteEmployee =(req,res,next)=>{
  let id =req.params.id
  Employee.findByIdAndDelete(id)
  .exec((err,data)=>{
    if (err) {
        return res.status(400).json({
          error: "Failed to delete ",
          err
        });
      }
      res.json({
        message: "Employee Deleted..",
        data
      });
  })

}


//update employee Controller
exports.updateEmployee=(req,res,next)=>{
  const id= req.params.id
  const file = req.files.photo
  if(!req.files)
  {
      res.status(400).json({msg:"Image was not found"});
      return;
  }
  
  let shortId=shortid.generate()
  file.name = `photo_${shortId}_${file.name}`;

  file.mv(`uploads/${file.name}`, async err => {
    if (err) {
      console.error(err);
      return res.status(500).json({err:"problem with image"})
    }
  })
    
  let photo=file.name;//.file
  const reqd=req.body;
  const reqData= {reqd,photo};
  Employee.findByIdAndUpdate(id,reqData,{new:true})
  .exec((error,data)=>{
     if (error) return res.status(400).json({ error });
     if(data)  res.status(201).json({ message:"employee updated successfully!",data,
    }); 
  })
}


  //search controller by Employeename
  exports.getEmployeeByName=(req,res,next)=>{
    const searchField = req.query.employeename;
    if(!searchField){
      return res.status(400).json({message:"enter employee name"})
    }
    Employee.find({employeename:{$regex:searchField,$options:'$i'}})
    .then(data=>{
      return res.status(200).json(data)
    })
    .catch(err=>{
      return res.status(400).json({error:err})
    })
  }
