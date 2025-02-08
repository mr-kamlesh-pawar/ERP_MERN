const mongoose = require("mongoose");

const timetableSchema = new mongoose.Schema({
  option: { type: String, required: true }, // academic-calendar or timetable
  year: { type: String, required: true },
  department: { type: String, required: true }, // Fetched from faculty
  classNumber: { type: String, required: true },
  fileUrl: { type: String, required: true }, // URL of the uploaded file
  facultyId: { type: mongoose.Schema.Types.ObjectId, ref: "Faculty", required: true }, // Associate with faculty
  uploadedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Timetable", timetableSchema);