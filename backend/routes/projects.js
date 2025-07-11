const express = require("express");
const { addProject, getAllProjects } = require("../controllers/projectController");

const router = express.Router();

router.post("/add-project", addProject);
router.get("/get-all-projects",getAllProjects);
module.exports = router;
