const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router.post("/create", adminController.createAdmin);
router.get("/", adminController.getAdmins);
router.post("/create-employee",adminController.createEmployee);
router.get("/employees", adminController.getAllEmployees);
router.post("/create-site-lead",adminController.createSiteLead);
module.exports = router;
