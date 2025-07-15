const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
    employeeId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Employee',
    },
    date: {
        type: String
    },
    checkInTime:{
        type:Date,    
    },
    checkOutTime:{
        type:Date,
    }
}, { timestamps: true });

module.exports = mongoose.model('Attendance', AttendanceSchema);
