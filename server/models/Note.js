const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  fileUrl: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Faculty",
    required: true,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

const Notes = mongoose.model("Note", noteSchema);
module.exports = Notes;