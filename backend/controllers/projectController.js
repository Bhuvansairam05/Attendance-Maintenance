const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const projectsPath = path.join(__dirname, "../data/projects.json");
const usersPath = path.join(__dirname, "../data/users.json");
const users = fs.readFileSync(usersPath);
const usersData = JSON.parse(users);

const addProject = (req, res) => {
  const { projectName, sites } = req.body;

  if (!projectName || !Array.isArray(sites) || sites.length === 0) {
    return res.status(400).json({ success: false, message: "Project name and at least one site are required." });
  }
  
  const newProject = {
    id: uuidv4(),
    projectName,
    sites: sites.map(site => ({
      id: uuidv4(),
      siteName: site.siteName,
      siteLeadId: site.siteLeadId,
      workerIds: site.workerIds || []
    }))
  };
  

  usersData.map((user)=>{
    user.id === site.siteLeadId
  })


  let projects = [];
  if (fs.existsSync(projectsPath)) {
    projects = JSON.parse(fs.readFileSync(projectsPath, "utf-8"));
  }

  projects.push(newProject);
  fs.writeFileSync(projectsPath, JSON.stringify(projects, null, 2));

  res.status(201).json({ success: true, project: newProject });
};

const getAllProjects = (req, res) => {
  const usersPath = path.join(__dirname, "../data/users.json");

  let projects = [];
  let users = [];

  if (fs.existsSync(projectsPath)) {
    projects = JSON.parse(fs.readFileSync(projectsPath, "utf-8"));
  }

  if (fs.existsSync(usersPath)) {
    users = JSON.parse(fs.readFileSync(usersPath, "utf-8"));
  }
  const userMap = {};
  users.forEach(user => {
    userMap[user.id] = user.name;
  });


  const detailedProjects = projects.map(project => ({
    id: project.id,
    projectName: project.projectName,
    sites: project.sites.map(site => ({
      id: site.id,
      siteName: site.siteName,
      siteLeadName: userMap[site.siteLeadId] || "Unknown",
      workerNames: site.workerIds.map(workerId => userMap[workerId] || "Unknown")
    }))
  }));

  res.json({ success: true, projects: detailedProjects });
};

module.exports = { addProject, getAllProjects };
