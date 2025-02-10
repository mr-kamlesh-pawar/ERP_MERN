const mongoose = require("mongoose");


const feeSchema = new mongoose.Schema({
  department: { type: String, required: true },
  batch: { type: String, required: true },
  year: { type: String, required: true },
  fileUrl: { type: String, required: true }, // Cloudinary URL
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Faculty", required: true }, // Reference to the faculty who uploaded the fee structure
});

module.exports = mongoose.model("FeeStructure", feeSchema);