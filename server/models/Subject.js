const mongoose= require('mongoose');

const subjectSchema= new mongoose.Schema({
    
    subjectName: {
        type: String,
        required: true,
        trim: true,
      },
      subjectCode: {
        type: String,
        required: true,
      },
      department: {
        type: String,
        required: true,
      },
      totalLectures: {
        type: Number,
        default: 10,
      },
      year: {
        type: String,
        required: true,
      },
      


        
});

const Subject= mongoose.model('Subject', subjectSchema);
module.exports= Subject;