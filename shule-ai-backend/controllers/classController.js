const Class = require("../models/Class");

exports.createClass = async (req,res) => {
  const cls = await Class.create(req.body);
  res.json(cls);
};

exports.assignStudent = async (req,res) => {
  const { classId, studentId } = req.body;
  const cls = await Class.findByIdAndUpdate(classId,{$push:{students:studentId}},{ new:true });
  res.json(cls);
};
