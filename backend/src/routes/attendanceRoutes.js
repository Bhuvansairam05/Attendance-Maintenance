const express = require("express");
const router = express.Router();
const attendanceController = require("../controllers/attendanceController");

router.post("/checkIn",attendanceController.checkIn);
router.post("/checkOut",attendanceController.checkOut);
router.get("/getAttendance/:employeeId",attendanceController.getAttendance);
module.exports = router;