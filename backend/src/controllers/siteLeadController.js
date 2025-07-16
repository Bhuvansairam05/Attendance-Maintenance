const Attendance = require("../models/Attendance");

const approveAttendance = async (req,res)=>{
    const data = Attendance.findOne({"employeeId":req.body});
}

module.exports = {approveAttendance};