const mongoose= require('mongoose');

const adminSchema= new mongoose.Schema({
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
            default: 'admin'

        },

        department: {
            type: String,
          },
          dob: {
            type: String,
          },
          joiningYear: {
            type: String,
          },
          avatar: {
            type: String,
          },
          contactNumber: {
            type: Number,
          },
          passwordUpdated: {
            type: Boolean,
            default: false,
          },

        
},  { strict: false });

const Admin= mongoose.model('Admin', adminSchema);
module.exports= Admin;