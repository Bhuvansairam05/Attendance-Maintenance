const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const adminRoutes = require("./routes/adminRoutes");
const authRoutes = require("./routes/auth");
const attendanceRoutes = require("./routes/attendanceRoutes");
const SiteLeadRoutes = require("./routes/siteLeadRoutes");
app.use("/api/admins", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/attendance",attendanceRoutes);
app.use("/api/siteLead",SiteLeadRoutes)
mongoose
  .connect(process.env.mongoDB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(" Connected to MongoDB");
    app.listen(5000, () => console.log(" Server running on port 5000"));
  })
  .catch((err) => console.error("MongoDB error:", err));
