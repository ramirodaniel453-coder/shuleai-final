const User = require("../models/User");
const Parent = require("../models/Parent");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Student = require("../models/Student");

// Admin/Teacher Registration
exports.registerUser = async (req,res) => {
  const { name,email,password,role } = req.body;
  const hashed = await bcrypt.hash(password,10);
  const user = await User.create({ name,email,password:hashed,role });
  res.json({ message:"Registered" });
};

// Login
exports.loginUser = async (req,res) => {
  const { email,password } = req.body;
  let user = await User.findOne({ email });
  if (!user) user = await Parent.findOne({ email });
  if (!user) return res.status(400).json({ message:"User not found" });

  const match = await bcrypt.compare(password,user.password);
  if (!match) return res.status(400).json({ message:"Wrong password" });

  const tokenData = { id:user._id, role:user.role || "parent" };

  // If parent, attach allowed student(s)
  if(user.role === undefined){ 
    tokenData.students = user.students;
  }

  const token = jwt.sign(tokenData, process.env.JWT_SECRET,{ expiresIn:"7d" });
  res.json({ token });
};

// Parent binds to student
exports.bindParent = async (req,res) => {
  const { parentId, elimuId } = req.body;
  const parent = await Parent.findById(parentId);
  const student = await Student.findOne({ elimuId });
  if(!student) return res.status(400).json({ message:"Invalid ELIMUID" });

  if(student.parents.length >= 3) return res.status(403).json({ message:"Max 3 guardians allowed" });

  // Link parent
  if(!parent.students.includes(student._id)) {
    parent.students.push(student._id);
    await parent.save();
    student.parents.push(parent._id);
    await student.save();
  }

  res.json({ message:"Parent linked", student });
};
