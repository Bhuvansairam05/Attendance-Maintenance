const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");

const usersPath = path.join(__dirname, "../data/users.json");

const loginUser = (req, res) => {
  const { username, password ,role} = req.body;

  const users = JSON.parse(fs.readFileSync(usersPath, "utf-8"));

  const user = users.find(u => u.username === username && u.password === password && u.role === role);

  if (user) {
    res.json({ success: true, user });
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }
};

const addUser = (req, res) => {
  const { name, username, password,mobile, role } = req.body;

  if (!name || !username || !password || !mobile || !role) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }
  let monthlyPay = null;
  if(role=="employee"){
     monthlyPay = req.body.monthlyPay;
    if(!monthlyPay){
      return res.status(400).json({ success: false, message: "Monthly pay is required for employees" });
    }
  }
  let projectId = null;
  let users = JSON.parse(fs.readFileSync(usersPath, "utf-8"));

  const exists = users.find(u => u.username === username);
  if (exists) {
    return res.status(409).json({ success: false, message: "User already exists" });
  }

  const newUser = {
    id: uuidv4(),
    name,
    username,
    password,
    role,
    mobile,
    monthlyPay: role === "employee" ? monthlyPay : null,
    projectId
  };

  users.push(newUser);
  fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));

  res.status(201).json({ success: true, user: newUser });
};

const getUnAssigned = (req, res) => {
  try{ 
  const users = JSON.parse(fs.readFileSync(usersPath, "utf-8"));
  if(!users || users.length ===0){
    return res.status(404).json({success:false, message:"No users found"})
  }
  const unassignedUsers = users.filter(u => u.projectId === null);
  res.json({ success: true, users: unassignedUsers });
  }
  catch(error){
    res.status(500).json({success:false,message:"Internal Server Error"});
  }
}

module.exports = { loginUser, addUser ,getUnAssigned};