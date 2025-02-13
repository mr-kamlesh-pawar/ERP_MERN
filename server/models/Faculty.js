const mongoose= require('mongoose');

const facultySchema= new mongoose.Schema({
    userName:{
        type: String,
        required: true,
        unique: true
        },
    email:{
        type: String,
        required: true,
        unique: true
        },
    password:{
        type: String,
        required: true,
        },

    role:{
        type: String,
        default: 'faculty'
        },

        name: {
            type: String,
            
          },
          avatar: {
            type: String,
          },
          gender: {
            type: String,
          },
          designation: {
            type: String,
            
          },
          department: {
            type: String,
            required: true,
          },
          avatar: {
            type: String,
            
          },
          contactNumber: {
            type: Number,
          },
          dob: {
            type: String,
            
          },
          joiningYear: {
            type: Number,
           
          },
          passwordUpdated: {
            type: Boolean,
            default: false,
          },


        
});

const Faculty= mongoose.model('Faculty', facultySchema);
module.exports= Faculty;