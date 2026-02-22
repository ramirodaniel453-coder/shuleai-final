const mongoose = require("mongoose");

const parentSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }] // max 3
}, { timestamps: true });

module.exports = mongoose.model("Parent", parentSchema);
