const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  userName: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "student" },
  name: { type: String, required: true },
  avatar: { type: String },
  year: { type: String, required: true },
  class1: { type: String, required: true },
  subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subject" }],
  gender: { type: String },
  fatherName: { type: String },
  motherName: { type: String },
  department: { type: String, required: true },
  semester: { type: String,  },
  batch: { type: String },
  contactNumber: { type: Number },
  fatherContactNumber: { type: Number },
  dob: { type: String },
  passwordUpdated: { type: Boolean, default: false },
  class: { type: String },
});

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;