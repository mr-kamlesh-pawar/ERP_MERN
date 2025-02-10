const mongoose = require("mongoose");

// Test Schema
const testSchema = new mongoose.Schema({
  testTitle: { type: String, required: true },
  totalMarks: { type: String, required: true },
  department: { type: String, required: true },
  subject: { type: String, required: true },
  year: { type: String, required: true },
  class: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Faculty", required: true },
  createdAt: { type: Date, default: Date.now },
});


module.exports = mongoose.model("Test", testSchema);