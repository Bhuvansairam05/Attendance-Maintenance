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
      if(user){
        res.json({ success: true, user });
      } else {
        res.status(401).json({ success: false, message: "Invalid credentials" });
      }
    });
  }
  else if(role ==="siteLead"){
    SiteLead.find({username,password}).then(user => {
      if(user){
        res.json({ success: true, user });
      } else {
        res.status(401).json({ success: false, message: "Invalid credentials" });
      }
    });
  }
  else if(role ==="employee"){
    Employee.find({username,password}).then(user => {
      if(user){
        res.json({ success: true, user });
      } else {
        res.status(401).json({ success: false, message: "Invalid credentials" });
      }
    });
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
    if(!siteLead){
      res.status(404).json({error:"Wrong siteLead Id"});
    }
    res.status(200).json(siteLead);
  }
  catch(error){
    res.status(500).json({error:`error occured while fetching data`});
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