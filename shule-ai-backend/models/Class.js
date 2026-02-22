const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
  name: String,
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
  academicYear: String
}, { timestamps: true });

module.exports = mongoose.model("Class", classSchema);
