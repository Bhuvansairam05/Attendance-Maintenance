const Attendance = require("../models/Attendance");

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
    try{
        const {employeeId} = req.body;
        if(!employeeId){
           return res.status(400).json({error:"EmployeeId is required"});
        }
        const date = new Date();
        const dateStr = date.toISOString().split('T')[0];
        const existing =await Attendance.findOne({employeeId,date:dateStr});
        console.log(existing);
        if(!existing){
            return res.status(400).json({error:"First CheckIn before Checkout"});
        }
        if(existing.checkOutTime){
            return res.status(409).json({error:"Checkout is done already"});
        }
        existing.checkOutTime = date;
        await existing.save();
        return res.status(200).json({message:"Check-out recorded successfully"});
    }
    catch(error){
       return res.status(500).json({error:"Cannot fetch data"});
    }
}