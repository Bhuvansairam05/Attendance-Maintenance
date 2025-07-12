const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    mobileNumber:{
        type:String,
        required:true
    },
    monthlyPay:{
        type:Number,
        required:true
    },
    inProject:{
        type:Boolean,
        default:false
    },
    workingDays:{
        type:Number,
        default:0
    }
},{
    timestamps:true
})

module.exports = mongoose.model('Employee',EmployeeSchema);