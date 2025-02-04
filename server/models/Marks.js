import mongoose from "mongoose";


const marksSchema = new Schema({
  exam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Test",
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
  },
  marks: {
    type: Number,
    default: -1,
  },
});

export default mongoose.model("Marks", marksSchema);
