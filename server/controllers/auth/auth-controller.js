const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../../models/Admin");
const Student = require("../../models/Student");
const Faculty = require("../../models/Faculty");

//register
const registerUser = async (req, res) => {

  const { userName, email, password, role } = req.body;

  try {
    // Check if the email or username already exists in any collection
    const existingEmail =
      (await Admin.findOne({ email })) ||
      (await Student.findOne({ email })) ||
      (await Faculty.findOne({ email }));
    if (existingEmail) {
      return res.status(400).json({
        success: false,
        message: "Email already exists. Please choose a different one.",
      });
    }

    const existingUser =
      (await Admin.findOne({ userName })) ||
      (await Student.findOne({ userName })) ||
      (await Faculty.findOne({ userName }));
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Username already exists. Please choose a different one.",
      });
    }

    // Hash the password
    const hashPassword = await bcrypt.hash(password, 12);

    // Create a new user based on the role
    let newUser;
    if (role === "admin") {
      newUser = new Admin({ userName, email, password: hashPassword });
    } else if (role === "student") {
      newUser = new Student({ userName, email, password: hashPassword });
    } else if (role === "faculty") {
      newUser = new Faculty({ userName, email, password: hashPassword });
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid role specified.",
      });
    }

    // Save the user to the database
    await newUser.save();
    res.status(201).json({
      success: true,
      message: "User registered successfully.",
    });
  } catch (error) {
    console.error("Error in registerUser:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

// Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists in any collection
    let user =
      (await Admin.findOne({ email })) ||
      (await Student.findOne({ email })) ||
      (await Faculty.findOne({ email }));

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found. Please register first.",
      });
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid password. Please try again.",
      });
    }

    // Generate a JWT token
    const token = jwt.sign(
      {
        id: user._id,
        userName: user.userName,
        role: user.role,
        email: user.email,
      },
      "JWT_SECRET_KEY", // Replace with a secure secret key
      { expiresIn: "5h" }
    );

    // Set the token in a cookie and send the response
    res.cookie("token", token, { httpOnly: true, secure: true,  sameSite: "strict", }).json({
      success: true,
      message: "User logged in successfully.",
      user: {
        id: user._id,
        userName: user.userName,
        role: user.role,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error in loginUser:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

// Logout User
const logout = async (req, res) => {
  try {
    res.clearCookie("token").json({
      success: true,
      message: "User logged out successfully.",
    });
  } catch (error) {
    console.error("Error in logout:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};


// Auth Middleware


//const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  // Get the token from the cookies
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized user. Please log in.",
    });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, "JWT_SECRET_KEY");

    // Attach the decoded user information to the request object
    req.user = {
      id: decoded.id,
      userName: decoded.userName,
      role: decoded.role,
      email: decoded.email,
    };

    next(); // Proceed to the next middleware or controller
  } catch (error) {
    console.error("Error in authMiddleware:", error);
    res.status(401).json({
      success: false,
      message: "Unauthorized user. Invalid token.",
    });
  }
};



module.exports = { registerUser, loginUser, logout, authMiddleware };