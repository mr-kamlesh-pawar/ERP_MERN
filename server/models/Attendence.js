// Updated Attendance Schema
const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  semester: {
    type: String,
    required: true,
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
    required: true,
  },
  faculty: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Faculty",
    required: true
  },
  date: {
    type: String,
    required: true,
  },
  // Store attendance as an array of present students
  presentStudents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student"
  }],
  // Store total class strength for reference
  totalStudents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student"
  }]
});

// Create a compound unique index to prevent duplicate records
attendanceSchema.index({ subject: 1, date: 1 }, { unique: true });

const Attendance = mongoose.model('Attendance', attendanceSchema);
module.exports = Attendance;