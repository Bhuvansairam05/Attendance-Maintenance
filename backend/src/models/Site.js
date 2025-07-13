const mongoose = require('mongoose');

const siteSchema = new mongoose.Schema({
    siteNo:{
        type:Number,
    },
    siteLeadName:{
        type:String,
    },
    siteLeadID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'SiteLead'
    },
    Employees:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee'
    }]
}, { timestamps: true });

module.exports = mongoose.model('Site',siteSchema);