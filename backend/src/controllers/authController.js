const Admin = require("../models/Admin");
const SiteLead = require("../models/SiteLead");
const Employee = require("../models/Employee");
const Site = require("../models/Site");
const loginUser = (req, res) => {
  const { username, password ,role} = req.body;
  if(!username || !password || !role) {
    return res.status(400).json({success:false,message:"Username, password and role are required"});
  }
  if(role ==="admin"){
    Admin.find({username,password}).then(user => {
      if(user.length>0){
        res.json({ success: true, user });
      } else {
        res.status(200).json({ success: false, message: "Invalid credentials" });
      }
    }).catch(err=>{res.status(500).json({message:"server error"})});
  }
  else if(role ==="siteLead"){
    SiteLead.find({username,password}).then(user => {
      if(user.length>0){
        res.json({ success: true, user });
      } else {
        res.status(401).json({ success: false, message: "Invalid credentials" });
      }
    }).catch(err=>{res.status(500).json({message:"server error"})});
  }
  else if(role ==="employee"){
    Employee.find({username,password}).then(user => {
      if(user.length>0){
        res.json({ success: true, user });
      } else {
        res.status(401).json({ success: false, message: "Invalid credentials" });
      }
    }).catch(err=>{res.status(500).json({message:"server error"})});
  }
  else{
    return res.status(400).json({success:false,message:"Invalid role"});
  }
 
};

const getAdmin = async(req,res)=>{
  try {
      const adminId = req.params.adminId;
      const admin = await Admin.findById(adminId);
      res.status(200).json(admin);
    } catch (error) {
      res.status(500).json({ error: "Error fetching admins" });
    }
}

const getSiteLead = async(req,res)=>{
  try{
    if(!req.params.siteLeadId){
      res.status(404).json({error:"siteLeadId required"});
    }
    const siteLead = await Site.findOne({"siteLeadID":req.params.siteLeadId});
    const siteLeadData = await SiteLead.findById(req.params.siteLeadId);
    console.log(siteLead);
    console.log(siteLeadData);
    if(!siteLead && siteLeadData){
      return res.status(200).json(siteLeadData);
    }
    else if(!siteLead){
      return res.status(404).json({error:"Wrong siteLead Id"});
    }
    return res.status(200).json(siteLead);
  }
  catch(error){
    return res.status(500).json({error:`error occured while fetching data`});
  }
}

const getEmployee = async(req,res)=>{
  try{
    if(!req.params.employeeId){
      res.status(404).json({message:"not found"});
    }
    const employee = await Employee.findById(req.params.employeeId);
    res.status(200).json(employee);
  }
  catch(error){
    res.status(500).json({error:"error occured while fetching data"});
  }
}

module.exports = { loginUser ,getAdmin,getSiteLead,getEmployee};