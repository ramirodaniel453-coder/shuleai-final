const Student = require("../models/Student");

function generateElimuId() {
  const timestamp = Date.now().toString(36);
  const random = Math.floor(Math.random()*10000).toString(36);
  return `ELIMU-${timestamp}-${random}`.toUpperCase();
}

exports.createStudent = async (req,res) => {
  const { name,class:classId } = req.body;
  const student = await Student.create({
    name,
    class: classId,
    elimuId: generateElimuId(),
    performance:{ math:0,english:0,science:0 }
  });
  res.status(201).json(student);
};

exports.getStudents = async (req,res) => {
  const students = await Student.find();
  res.json(students);
};
