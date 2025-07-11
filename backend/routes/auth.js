const express = require("express");
const { loginUser, addUser, getUnAssigned} = require("../controllers/authController");

const router = express.Router();

router.post("/login", loginUser);
router.post("/add-user", addUser);
router.get("/unassigned", getUnAssigned);

module.exports = router;
