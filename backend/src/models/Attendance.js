const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
    workerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Worker',
    },
    date: {
        type: Date,
        required: true,
    },
    checkInTime:{
        type:Date,
    },
    checkOutTime:{
        type:Date,
    }
}, { timestamps: true });

module.exports = mongoose.model('Attendance', AttendanceSchema);
