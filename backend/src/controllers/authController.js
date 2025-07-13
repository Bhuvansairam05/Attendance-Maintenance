const Admin = require("../models/Admin");
const SiteLead = require("../models/SiteLead");
const Employee = require("../models/Employee");

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

module.exports = { loginUser };