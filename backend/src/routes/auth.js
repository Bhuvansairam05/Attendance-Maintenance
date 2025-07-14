const express = require("express");
const { loginUser,getAdmin, getSiteLead,getEmployee} = require("../controllers/authController");

const router = express.Router();

router.post("/login", loginUser);
router.get("/admin/:adminId",getAdmin);
router.get("/siteLead/:siteLeadId",getSiteLead);
router.get("/employee/:employeeId",getEmployee);

module.exports = router;
