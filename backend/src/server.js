const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const path = require("path");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname,"../../frontend")));
const adminRoutes = require("./routes/adminRoutes");
const authRoutes = require("./routes/auth");
const attendanceRoutes = require("./routes/attendanceRoutes");

app.use("/api/admins", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/attendance",attendanceRoutes);

mongoose
  .connect(process.env.mongoDB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(" Connected to MongoDB");
    app.listen(5000, () => console.log(" Server running on port http://localhost:5000"));
  })
  .catch((err) => console.error("MongoDB error:", err));
