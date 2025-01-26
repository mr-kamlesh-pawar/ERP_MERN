//register
//login
//logout
//auth-middleware

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");

//register
const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
      
      const existingEmail = await User.findOne({ email });
      if (existingEmail) {
          return res.json({
              success: false,
              message: 'Email already exists. Please choose a different one.',
            });
        }

        const existingUser = await User.findOne({ userName });
        if (existingUser) {
            return res.json({
                success: false,
                message: 'User Name already exists. Please choose a different one.',
              });
          }

    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      userName,
      email,
      password: hashPassword,
    });

    newUser.save();
    res
      .status(201)
      .json({ success: true, message: "User Registered Successfully" });
  } catch (error) {
    if (error.code === 11000) {
      res
        .status(400)
        .json({ success: false, error: "Username already exists" });
    } else {
      res.status(500).json({ success: false, error: "Internal server error" });
    }

    console.log("At Register Module", error);
  }
};

//login

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const checkUser=  await User.findOne({email});
    if(!checkUser){
        return res.json({
            success:false,
            message:'User not found Please Register First',
        })
    }

    const verifyPassword= await bcrypt.compare(password, checkUser.password);
    if(!verifyPassword){
        return res.json({
            success:false,
            message:'Invalid Password! Please try again',
        });

    }

    //jwt token
    const token = jwt.sign(
        {
            id: checkUser._id,
            userName: checkUser.userName,
            role: checkUser.role,
            email: checkUser.email,
        }, 'JWT_SECRET_KEY', {expiresIn: '1h'}
    );

    res.cookie('token',token, {httpOnly: true, secure: true} ).json({
        success: true,
        message: 'User logged in successfully',
        user:{
            id: checkUser._id,
            userName: checkUser.userName,
            role: checkUser.role,
            email: checkUser.email,
        }
    })



  } catch (error) {
    console.log("At Register Module", error);
    res
      .status(500)
      .json({ success: false, message: "Some Error Occured while Register" });
  }
};

//logout

const logout=  async(req,res)=>{
    res.clearCookie('token').json({
        success:true,
        message: 'User logout Sucessfully'
    });
}

//auth-middleware
const authMiddleware = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ success: false, message: "Unauthorized User!" });
    }
    try{
        const decoded= jwt.verify(token, 'JWT_SECRET_KEY');
        req.user= decoded;
        next()
    } catch(error){
        console.log(error);
        return res.status(401).json({ success: false, message: "Unauthorized User" });
    }
}

module.exports = { registerUser, loginUser, logout, authMiddleware };
