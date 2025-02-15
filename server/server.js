const express = require('express');
const dbConnect = require('./utils/dataBase');
const app = express();
require('dotenv').config();
const cookieParser = require('cookie-parser');
const cors = require('cors');
 const authRouter= require('./routes/auth-routes/auth-routes');
// const adminProductsRoute = require("./routes/admin/products-routes")
const PORT = process.env.PORT;
const adminRoutes = require('./routes/admin/adminRoutes')
const facultyRoutes = require('./routes/faculty/facultyRoutes')
const StudentRoutes = require('./routes/student/studentRoutes')
// CORS Configuration
app.use(
    cors({
      origin: (origin, callback) => {
        // Allow requests with no origin (e.g., mobile apps, curl requests)
        if (!origin) return callback(null, true);
  
        // List of allowed origins
        const allowedOrigins = [
          "http://localhost:5173", // Your local development server
          "https://rmd-erp-sigma.vercel.app", // Your production frontend
        ];
  
        // Check if the origin is in the allowed list
        if (allowedOrigins.includes(origin)) {
          return callback(null, true);
        } else {
          return callback(new Error("Not allowed by CORS"));
        }
      },
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed HTTP methods
      credentials: true, // Allow credentials (cookies, authorization headers)
      allowedHeaders: ["Content-Type", "Authorization", "Cache-Control", "Expires", "Pragma"], // Allowed headers
    })
  );
  
  // Handle Preflight Requests
  app.options('*', (req, res) => {
    res.header('Access-Control-Allow-Private-Network', 'true'); // Add this header for private network access
    res.header('Access-Control-Allow-Origin', req.headers.origin || '*'); // Dynamically set the allowed origin
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS'); // Allowed methods
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Cache-Control, Expires, Pragma'); // Allowed headers
    res.header('Access-Control-Allow-Credentials', 'true'); // Allow credentials
    res.sendStatus(204); // No content for preflight
  });

app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRouter);
app.use('/api/admin', adminRoutes);
app.use('/api/faculty', facultyRoutes);
app.use('/api/student', StudentRoutes);

//http://localhost:5000/api/faculty/mark-attendance

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

dbConnect();


//default route
app.get("/", (req,res)=>{
    res.send("<h1>This is Server home page of Rasiklal M. Dhariwal Institute of Technology, Chinchwad ERP System</h1> ");
});