const mongoose=require("mongoose");
require("dotenv").config();

const dbConnect=()=>{

  mongoose.connect(process.env.DATABASE_URL)
  .then(()=>{console.log("Database Connection Sucessfully ")})
  
  
    .catch((err)=>{
      console.log("Database Connection error");
      console.error(err.message);
      process.exit(1);       

  })

  }


module.exports=dbConnect;