const express = require("express");
const router = express.Router();

const {getAllemployee,createEmployee,getEmployeeById,deleteEmployee,updateEmployee,getEmployeeByName,getEmployeeExcelData}= require("../controller/employee");

router.post("/employee/create",createEmployee);
router.get("/employee/get",getAllemployee);
router.get("/employeeId/:id",getEmployeeById);
router.delete("/employee/delete/:id",deleteEmployee);
router.put("/employee/update/:id",updateEmployee);
router.get("/employee/search",getEmployeeByName)
router.get("/employee/excelData",getEmployeeExcelData)

//getEmployeeExcelData

module.exports=router;