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
    },
    isApproved: {
  type: Boolean,
  default: false
},isRejected: {
  type: Boolean,
  default: false
}

}, { timestamps: true });

module.exports = mongoose.model('Attendance', AttendanceSchema);
