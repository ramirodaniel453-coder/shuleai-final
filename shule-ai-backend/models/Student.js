const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: String,
  class: { type: mongoose.Schema.Types.ObjectId, ref: "Class" },
  elimuId: { type: String, unique: true },
  performance: { math: Number, english: Number, science: Number },
  performanceHistory: [],
  parents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Parent" }]
}, { timestamps: true });

module.exports = mongoose.model("Student", studentSchema);
