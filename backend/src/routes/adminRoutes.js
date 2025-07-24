const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router.post("/create", adminController.createAdmin);
router.post("/create-employee",adminController.createEmployee);
router.get("/employees", adminController.getAllEmployees);
router.post("/create-site-lead",adminController.createSiteLead);
router.get("/site-leads",adminController.getAllSiteLeads);
router.post("/create-project",adminController.createProject);
router.get("/projects",adminController.getAllProjects);
router.get("/project/:id",adminController.getProjectDetails);
router.get("/unassigned-siteLeads",adminController.getUnAssignedSiteLeads);
router.get("/unassigned-employees",adminController.getUnAssignedEmployees);
router.post("/create-site",adminController.createSite);
router.delete("/delete-site",adminController.deleteSite)
module.exports = router;
