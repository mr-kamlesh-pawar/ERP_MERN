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


        
});

const Faculty= mongoose.model('Faculty', facultySchema);
module.exports= Faculty;