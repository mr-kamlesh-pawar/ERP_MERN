const mongoose = require("mongoose");
const departmentSchema = mongoose.Schema({
  department: {
    type: String,
    required: true,
  },
  departmentCode: {
    type: String,
    required: true,
    unique: true,
  },
});


module.exports = mongoose.model("Department", departmentSchema);


