const mongoose = require('mongoose');

const SiteLeadSchema = new mongoose.Schema({
    username:{
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