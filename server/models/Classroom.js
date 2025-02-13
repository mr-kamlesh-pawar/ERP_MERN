const mongoose = require('mongoose');

const classroomSchema = new mongoose.Schema({
  faculty: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  department: {
    type: String,
    required: true
  },
  semester: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true
  },
  class: {
    type: Number,
    required: true,
    enum: [1, 2, 3]
  },
  googleClassCode: {
    type: String,
    required: true
  },
  inviteLink: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});


module.exports = mongoose.model("Classroom", classroomSchema);

