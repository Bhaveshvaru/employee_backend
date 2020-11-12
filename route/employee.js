const express = require("express");
const router = express.Router();

const {getAllemployee,createEmployee}= require("../controller/employee");

router.post("/employee/create",createEmployee)
router.get("/employee/get",getAllemployee)

module.exports=router