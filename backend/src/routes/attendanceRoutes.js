const express = require("express");
const router = express.Router();
const attendanceController = require("../controllers/attendanceController");

router.post("/checkIn",attendanceController.checkIn);
router.post("/checkOut",attendanceController.checkOut);
router.get("/getAttendance/:employeeId",attendanceController.getAttendance);
router.post("/approve/:employeeId",attendanceController.approveAttendance);
router.post("/reject/:employeeId",attendanceController.rejectAttendance);
module.exports = router;