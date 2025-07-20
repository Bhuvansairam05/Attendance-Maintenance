const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    startDate: { type: Date },
    totalWorkingDays: { type: Number, default: 0 },
    totalWorkingMonths: { type: Number, default: 0 },
    totalWorkingYears: { type: Number, default: 0 },
    sites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Site" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
