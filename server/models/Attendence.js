const mongoose = require('mongoose');

const attendenceSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
    required: true,
  },
  totalLecturesByFaculty: {
    type: Number,
    default: 1,
  },
  lectureAttended: {
    type: Number,
    default: 0,
  },
  date: {
    type: Date,
    required: true,
  },
});

const Attendence = mongoose.model('Attendence', attendenceSchema);
module.exports = Attendence;