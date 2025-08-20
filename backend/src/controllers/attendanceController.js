const Attendance = require("../models/Attendance");
const Employee = require("../models/Employee");
exports.checkIn = async (req, res) => {
    try {
        const { employeeId } = req.body;
        if (!employeeId) {
            return res.status(400).json({ error: "EmployeeID is required" });
        }
        const now = new Date();
        const date = now.toISOString().split('T')[0];
        const exist = await Attendance.findOne({ employeeId, date });
        if (exist) {
            return res.status(409).json({ error: "Already Checked In" });
        }
        const newAttendance = new Attendance({
            employeeId,
            date,
            checkInTime: now
        });
        await newAttendance.save();
        res.status(201).json({
            message: 'Check-in recorded successfully',
            data: newAttendance
        });
    }
    catch (error) {
        return res.status(500).json({ error: "Cannot fetch Data" });
    }
}

exports.checkOut = async (req, res) => {
    try {
        const { employeeId } = req.body;
        if (!employeeId) {
            return res.status(400).json({ error: "EmployeeId is required" });
        }
        const date = new Date();
        const dateStr = date.toISOString().split('T')[0];
        const existing = await Attendance.findOne({ employeeId, date: dateStr });
        // console.log(existing);
        if (!existing) {
            return res.status(400).json({ error: "First CheckIn before Checkout" });
        }
        if (existing.checkOutTime) {
            return res.status(409).json({ error: "Checkout is done already" });
        }
        existing.checkOutTime = date;
        await existing.save();
        return res.status(200).json({ message: "Check-out recorded successfully" });
    }
    catch (error) {
        return res.status(500).json({ error: "Cannot fetch data" });
    }
}
exports.getAttendance = async (req, res) => {
    try {
        const employeeId = req.params.employeeId;
        if(!employeeId){
            return res.status(404).json({error:"data not found"})
        }
        const now = new Date();
        const date = now.toISOString().split('T')[0];
        const response = await Attendance.findOne({ employeeId: employeeId, date: date });
        if (!response) {
            return res.status(400).json({ error: "no data" });
        }
        return res.status(200).json({ success: true, message: "successfull", data: response });
    }
    catch (error) {
        return res.status(500).json({ error: "Server Error" });
    }
}

exports.approveAttendance = async (req, res) => {
    const employeeId = req.params.employeeId;
    try {
        const now = new Date();
        const date = now.toISOString().split('T')[0];
        const attendanceDetails = await Attendance.findOne({ employeeId: employeeId, date: date });
        if (!attendanceDetails) {
            return res.status(404).json({ error: "Record not found" });
        }
        if (attendanceDetails?.isApproved === true || attendanceDetails?.isRejected === true){
            return res.status(400).json({error:"Attendance is already updated"});
        }
        const checkInTime = attendanceDetails.checkInTime;
        const checkOutTime = attendanceDetails.checkOutTime;
        if (!checkInTime || !checkOutTime) {
            return res.status(400).json({ message: "Check-in or Check-out time is missing" });
        }
        const timeDiffMs = new Date(checkOutTime) - new Date(checkInTime);
        const timeDiffHours = timeDiffMs / (1000 * 60 * 60);
         
        if (timeDiffHours >= 6) {
           
            await Employee.updateOne(
                { _id: employeeId }, 
                {
                    $inc: {
                        workingDays: 1,
                        totalWorkingDays: 1
                    }
                }
            );
            await Attendance.updateOne(
                {employeeId,date},
                {
                    $set:{isApproved:true}
                }
            );
            return res.status(200).json({ message: "Approval done" });
        } else {
            await Employee.updateOne(
                { _id: employeeId }, 
                {
                    $inc: {
                        totalWorkingDays: 1
                    }
                }
            );
            await Attendance.updateOne(
                {employeeId,date},
                {
                    $set:{isRejected:true}
                }
            );
            return res.status(400).json({ message: "Approval can't be done. Less than 6 hours worked." });
        }
    }
    catch (error) {
        return res.status(500).json({ error: "server not found" });
    }
}

exports.rejectAttendance = async (req, res) => {
    const employeeId = req.params.employeeId;
    try {
        const now = new Date();
        const date = now.toISOString().split('T')[0];
        const attendanceDetails = await Attendance.findOne({employeeId:employeeId,date:date});
        if(!attendanceDetails){
            return res.status(404).json({error:"Record not found"});
        }
        if(attendanceDetails.isApproved===true || attendanceDetails.isRejected===true){
            return res.status(400).json({error:"Attendance is already updated"});
        }
        const checkInTime = attendanceDetails.checkInTime;
        const checkOutTime = attendanceDetails.checkOutTime;
        if(!checkInTime || !checkOutTime){
            return res.status(400).json({error:"Checkin and checkout both are required for updating attendance"});
        }
        await Attendance.updateOne(
            {employeeId:employeeId},
            {
                $set:{isRejected:true}
            }
        );
        await Employee.updateOne(
            {_id:employeeId},
            {
                $inc:{totalWorkingDays:1}
            }
        );
    }
    catch (error) {
        return res.status(500).json({ error: "server not found" });
    }
}
