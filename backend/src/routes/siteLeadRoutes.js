const express= require("express");
const router = express.Router();
const siteLeadController = require("../controllers/siteLeadController");

router.post("/approve",siteLeadController.approveAttendance);

module.exports = router;