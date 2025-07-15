const express = require("express");
const router = express.Router();
const attendanceController = require("../controllers/attendanceController");

router.post("/checkIn",attendanceController.checkIn);
router.post("/checkOut",attendanceController.checkOut);
module.exports = router;