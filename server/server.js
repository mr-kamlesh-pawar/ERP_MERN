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
app.use(cors({
    'origin': 'http://localhost:5173',
    'methods': ['GET', 'PUT', 'POST', 'DELETE'],
    'allowedHeaders': ['Content-Type', 
        'Authorization',
        'Cache-Control',
        'Expires',
        'Pragma'
    ],
    'credentials': true
}));

app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRouter);
app.use('/api/admin', adminRoutes);
app.use('/api/faculty', facultyRoutes);

//http://localhost:5000/api/faculty/mark-attendance

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

dbConnect();


//default route
app.get("/", (req,res)=>{
    res.send("<h1>This is Server home page</h1> ");
});