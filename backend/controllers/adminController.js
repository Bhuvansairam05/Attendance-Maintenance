const Admin = require("../models/Admin");
const Employee = require("../models/Employee");
const SiteLead = require("../models/SiteLead");
const Project = require("../models/Project");
const Site = require("../models/Site");
exports.createAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const newAdmin = new Admin({ username, password });
    await newAdmin.save();
    res.status(201).json({ message: "Admin created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error creating admin" });
  }
};

exports.getAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ error: "Error fetching admins" });
  }
};

exports.createEmployee = async (req, res) => {
  try {
    const { username, password, name, mobileNumber, monthlyPay } = req.body;
    const newEmployee = new Employee({
      username,
      password,
      name,
      mobileNumber,
      monthlyPay
    });
    await newEmployee.save();
    res.status(201).json({ message: "Employee created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error creating employee" });
  }
};

exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ error: "Error fetching employees" });
  }
};

exports.createSiteLead = async(req,res)=>{
    try{
        const{name,username,mobileNumber,password} = req.body;
        const newSiteLead = new SiteLead({name,username,mobileNumber,password});
        await newSiteLead.save();
        res.status(201).json({message:"Site Lead created successfully"});
    }
    catch(error){
        res.status(500).json({error:"Error creating site lead"});
    }
}

exports.getAllSiteLeads = async(req,res)=>{
    try{
        const siteLeads = await SiteLead.find();
        res.status(200).json(siteLeads);
    }
    catch(error){
        res.status(500).json({error:"Error fetching site leads"});
    }
}

exports.createProject = async (req, res) => {
  try {
    const { projectName, projectDescription, startDate, sites } = req.body;
    const createdSites = [];

    for (const site of sites) {
      const { siteName, siteLeadID, workerIDs } = site;

      const newSite = new Site({
        siteName,
        siteLeadID,
        workers: workerIDs
      });

      const savedSite = await newSite.save();
      createdSites.push(savedSite._id);
      await Employee.updateMany(
        { _id: { $in: workerIDs } },
        { $set: { inProject: true } }
      );

      await SiteLead.findByIdAndUpdate(siteLeadID, { inProject: true });
    }
    const newProject = new Project({
      projectName,
      projectDescription,
      startDate,
      sites: createdSites
    });

    await newProject.save();

    res.status(201).json({ message: "Project created successfully", project: newProject });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating project" });
  }
};