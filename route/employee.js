const express = require("express");
const router = express.Router();

const {getAllemployee,createEmployee,getEmployeeById,deleteEmployee,updateEmployee}= require("../controller/employee");

router.post("/employee/create",createEmployee);
router.get("/employee/get",getAllemployee);
router.get("/employeeId/:id",getEmployeeById);
router.delete("/employee/delete/:id",deleteEmployee);
router.put("/employee/update/:id",updateEmployee);

module.exports=router