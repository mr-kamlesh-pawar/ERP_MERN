const mongoose = require("mongoose");


// Test Result Schema
const testResultSchema = new mongoose.Schema({
  testId: { type: mongoose.Schema.Types.ObjectId, ref: "Test", required: true },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
  marksObtained: { type: Number, required: true },
  totalMarks: { type: Number, required: true },
  //createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Faculty", required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("TestResult", testResultSchema);