const Student = require("../models/Student");

exports.classAnalytics = async (req,res) => {
  const students = await Student.find({ class: req.params.classId });
  if(!students.length) return res.json({ message:"No students" });

  let totals = { math:0,english:0,science:0 };
  students.forEach(s => {
    totals.math += s.performance.math;
    totals.english += s.performance.english;
    totals.science += s.performance.science;
  });

  res.json({
    classAverage:{
      math: totals.math / students.length,
      english: totals.english / students.length,
      science: totals.science / students.length
    }
  });
};

// Simple trend-based prediction
exports.predictPerformance = async (req,res) => {
  const student = await Student.findById(req.params.id);
  const history = student.performanceHistory;
  if(history.length<2) return res.json({ message:"Not enough data" });

  const last = history[history.length-1];
  const prev = history[history.length-2];

  const prediction = {
    math:last.math+(last.math-prev.math),
    english:last.english+(last.english-prev.english),
    science:last.science+(last.science-prev.science)
  };
  res.json({ predictedNextTerm: prediction });
};
