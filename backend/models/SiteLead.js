const mongoose = require('mongoose');

const SiteLeadSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    mobileNumber:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    inProject:{
        type:Boolean,
        default:false
    }
}, { timestamps: true });

module.exports = mongoose.model('SiteLead',SiteLeadSchema);