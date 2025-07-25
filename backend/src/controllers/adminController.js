const Admin = require("../models/Admin");
const Employee = require("../models/Employee");
const SiteLead = require("../models/SiteLead");
const Project = require("../models/Project");
const Site = require("../models/Site");

exports.createAdmin = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const newAdmin = new Admin({ username, password, role });
    await newAdmin.save();
    res.status(201).json({ message: "Admin created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error creating admin" });
  }
};

exports.createEmployee = async (req, res) => {
  try {
    const { username, password, name, mobileNumber, monthlyPay, role } = req.body;
    const newEmployee = new Employee({
      username,
      password,
      name,
      mobileNumber,
      monthlyPay,
      role
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

exports.createSiteLead = async (req, res) => {
  try {
    const { name, username, mobileNumber, password, role } = req.body;
    const newSiteLead = new SiteLead({
      name,
      username,
      mobileNumber,
      password,
      role
    });
    await newSiteLead.save();
    res.status(201).json({ message: "Site Lead created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error creating site lead" });
  }
};

exports.getAllSiteLeads = async (req, res) => {
  try {
    const siteLeads = await SiteLead.find();
    res.status(200).json(siteLeads);
  } catch (error) {
    res.status(500).json({ error: "Error fetching site leads" });
  }
};
exports.createSite = async(req,res)=>{
  try{
    const{siteName, siteLeadID, workerIDs} = req.body;
    const siteLeadName = await SiteLead.findById(siteLeadID);
    const siteleadname = siteLeadName.name;
    const newSite = new Site({
      siteName,
      siteLeadID,
      Employees:workerIDs,
      siteLeadName: siteleadname
    });
    await SiteLead.updateOne(
      {_id:siteLeadID},
      {
        inProject:true
      }
    )
    await Employee.updateOne(
      {_id: {$in:workerIDs}},
      {
        inProject:true
      }
    )
    const savedSite = await newSite.save();
    return res.status(201).json(savedSite);
  }
  catch(error){
    return res.status(500).json({error:"500 Server not found"});
  }
}
exports.deleteSite = async(req,res)=>{
  try{
    const {siteId} = req.body;
    if(!siteId){
      return res.status(400).json({error:"SiteId required"});
    }
    const site = Site.findById(siteId);
    if(!site){
      return res.status(404).json({error:"Site not Found"});
    }
    const siteleadId = site.siteleadID;
    const employees = site.Employees;
    
    await SiteLead.updateMany(
      {_id: siteleadId},
      {
        inProject:false,
        workingProject:"",
        workingSite:""
      }
    )
    await Employee.updateMany(
      {_id:{$in:employees}},
      {
        inProject:false,
        workingProject:"",
        workingSite:""
      }
    )
    const deleteSite = await Site.findByIdAndDelete(siteId);
    return res.status(200).json({message:"Site is deleted"});
  }
  catch(error){
    return res.status(500).json({error:"500 Server not found"});
  }
}
exports.createProject = async (req, res) => {
  try {
    const { projectName, projectDescription, startDate, sites } = req.body;
    const createdSites = [];

    for (const site of sites) {
      const siteId = site;
      const siteData =await Site.findById(siteId);
      await Site.updateOne(
        {_id: siteId},
        {
          $set:{
            projectName:projectName
          }
        }
      )
      const workerIDs = siteData.Employees;
      const siteLeadName = siteData.siteLeadName;
      const siteLeadID = siteData.siteLeadID;
      createdSites.push(siteId);
      await Employee.updateMany(
        { _id: { $in: workerIDs } },
        {
          $set: {
            workingProject: projectName,
            workingSite: siteData.siteName,
            siteLeadName:siteLeadName
          }
        }
      );
      await SiteLead.updateMany(
        { _id: siteLeadID},
        {
          $set: {
            workingProject: projectName,
            workingSite: siteData.siteName
          }
        }
      );
    }
    const newProject = new Project({
      name:projectName,
      description:projectDescription,
      startDate,
      sites: createdSites,
    });

    await newProject.save();

    res
      .status(201)
      .json({ message: "Project created successfully", project: newProject });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating project" });
  }
};

exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate("sites");
    res.status(200).json({ projects });
  } catch (error) {
    res.status(500).json({ error: "Error fetching projects" });
  }
};

exports.getProjectDetails = async (req, res) => {
  try {

    const projectId = req.params.id;

    const project = await Project.findById(projectId)
      .populate({
        path: 'sites',
        populate: [
          { path: 'siteLeadID', model: 'SiteLead' },
          { path: 'Employees', model: 'Employee' }
        ]
      });

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const projectDetails = {
      name: project?.name,
      description: project?.description,
      numberOfSites: project.sites?.length,
      sites: project?.sites.map((site, index) => ({
        siteNumber: index + 1,
        siteLeadName: site?.siteLeadID?.name || "N/A",
        numberOfWorkers: site?.Employees?.length,
        workers: site.Employees?.map((worker, idx) => ({
          workerNumber: idx + 1,
          name: worker.name,
          presentDays: worker.workingDays
        })),
      })),
    };

    res.status(200).json(projectDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching project details" });
  }
};

exports.getUnAssignedSiteLeads = async(req, res)=>{
  try{
    const siteleads = await SiteLead.find({"inProject":false});
    if(siteleads){
      return res.status(200).json({data:siteleads});
    }
    return res.status(404).json({error:"Add SiteLeads to involve into project"});
  }
  catch(error){
    return res.status(500).json({error:"500 Server Not Found"});
  }
}

exports.getUnAssignedEmployees = async(req,res)=>{
  try{
    const employees = await Employee.find({"inProject":false});
    if(employees){
      return res.status(200).json({data:employees});
    }
    return res.status(404).json({error:"404 First add Employees before creating project"})
  }
  catch(error){
    return res.status(500).json({error:"500 Server Not Found"});
  }
}