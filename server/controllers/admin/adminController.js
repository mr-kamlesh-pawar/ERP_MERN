const Admin = require("../../models/Admin");
const Department = require("../../models/Department");
const Faculty = require("../../models/Faculty");
const Notice = require("../../models/Notice");
const bcrypt = require("bcryptjs");
const Subject = require("../../models/Subject");
const Event = require("../../models/Event");
const Student = require("../../models/Student");
const sendMail = require("../../utils/mailSender");

const getAdminProfile = async (req, res) => {
  try {
    // Get the admin ID from req.user (attached by authMiddleware)
    const adminId = req.user.id;

    // Find the admin by ID
    const admin = await Admin.findById(adminId);

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Return the admin profile data (excluding sensitive fields like password)
    const adminProfile = {
      userName: admin.userName,
      email: admin.email,
      department: admin.department,
      dob: admin.dob,
      joiningYear: admin.joiningYear,
      avatar: admin.avatar,
      contactNumber: admin.contactNumber,
      passwordUpdated: admin.passwordUpdated,
    };

    res.status(200).json(adminProfile);
  } catch (error) {
    console.error("Error fetching admin profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update Admin Profile
const updateAdminProfile = async (req, res) => {
  try {
    // Assuming the admin's ID is stored in req.user.id after authentication
    const adminId = req.user.id;

    // Extract the updated data from the request body
    const {
      userName,
      email,
      password,
      department,
      dob,
      joiningYear,
      avatar,
      contactNumber,
    } = req.body;

    // Find the admin by ID
    const admin = await Admin.findById(adminId);

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Update the admin fields (only update fields that are provided in the request)
    if (userName) admin.userName = userName;
    if (email) admin.email = email;
    if (password) admin.password = password; // Ensure to hash the password before saving
    if (department) admin.department = department;
    if (dob) admin.dob = dob;
    if (joiningYear) admin.joiningYear = joiningYear;
    if (avatar) admin.avatar = avatar;
    if (contactNumber) admin.contactNumber = contactNumber;

    // Save the updated admin data
    await admin.save();

    // Return the updated admin profile (excluding sensitive fields like password)
    const updatedAdminProfile = {
      userName: admin.userName,
      email: admin.email,
      department: admin.department,
      dob: admin.dob,
      joiningYear: admin.joiningYear,
      avatar: admin.avatar,
      contactNumber: admin.contactNumber,
      passwordUpdated: admin.passwordUpdated,
    };

    res.status(200).json({
      message: "Profile updated successfully",
      admin: updatedAdminProfile,
    });
  } catch (error) {
    console.error("Error updating admin profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Create a new notice
const createNotice = async (req, res) => {
  const { title, date, description, from, to } = req.body;

  try {
    // Create a new notice
    const newNotice = new Notice({
      title,
      date,
      description,
      from,
      to,
    });

    // Save the notice to the database
    await newNotice.save();

    // Fetch emails based on the 'to' field
    let recipientEmails = [];

    if (to === "students" || to === "all") {
      const students = await Student.find({}, "email"); // Fetch student emails
      recipientEmails.push(...students.map((student) => student.email));
    }

    if (to === "faculties" || to === "all") {
      const faculties = await Faculty.find({}, "email"); // Fetch faculty emails
      recipientEmails.push(...faculties.map((faculty) => faculty.email));
    }

    // Remove duplicate emails (if any)
    recipientEmails = [...new Set(recipientEmails)];

    // If there are recipients, send an email notification
    if (recipientEmails.length > 0) {
      const emailSubject = "New Notice: " + title;
      const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Notice Alert</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
          }
          .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          }
          .header {
            background: linear-gradient(135deg, #007bff, #00bfff);
            color: #ffffff;
            text-align: center;
            padding: 20px;
          }
          .header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: bold;
          }
          .content {
            padding: 20px;
            color: #333333;
          }
          .content h2 {
            font-size: 20px;
            margin-bottom: 10px;
          }
          .content p {
            font-size: 16px;
            line-height: 1.6;
          }
          .cta-button {
            display: inline-block;
            margin-top: 20px;
            padding: 12px 24px;
            background-color: #007bff;
            color: #ffffff;
            text-decoration: none;
            border-radius: 5px;
            font-size: 16px;
            transition: background-color 0.3s ease, transform 0.3s ease;
          }
          .cta-button:hover {
            background-color: #0056b3;
            transform: translateY(-2px);
          }
          .footer {
            text-align: center;
            padding: 20px;
            background-color: #f4f4f4;
            color: #666666;
            font-size: 14px;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="header">
            <h1>New Notice Alert</h1>
          </div>
          <div class="content">
            <h2>${title}</h2>
            <p><strong>Date:</strong> ${date}</p>
            <p>${description}</p>
            <p>From: <strong>${from}</strong></p>
            <a href="https://your-erp-system-link.com/notices" class="cta-button">View Notice</a>
          </div>
          <div class="footer">
            <p>© 2025 Rasiklal M. Dhariwal Institute of Technology, Chinchwad. All rights reserved.</p>
            <p>This is an automated email. Please do not reply.</p>
          </div>
        </div>
      </body>
      </html>
      `;

      // Send email to all recipients
      await sendMail(recipientEmails, emailSubject, '', htmlContent);
      console.log("Notice email sent successfully!");
    }

    res.status(201).json({
      success: true,
      message: "Notice created successfully & emails sent.",
      notice: newNotice,
    });
  } catch (error) {
    console.error("Error creating notice:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create notice",
    });
  }
};


// Get all notices
const getAllNotices = async (req, res) => {
  try {
    // Fetch all notices from the database
    const notices = await Notice.find();

    res.status(200).json({
      success: true,
      notices,
    });
  } catch (error) {
    console.error("Error fetching notices:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch notices",
    });
  }
};

// Get a single notice by ID
const getNoticeById = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the notice by ID
    const notice = await Notice.findById(id);

    if (!notice) {
      return res.status(404).json({
        success: false,
        message: "Notice not found",
      });
    }

    res.status(200).json({
      success: true,
      notice,
    });
  } catch (error) {
    console.error("Error fetching notice:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch notice",
    });
  }
};

// Update a notice by ID
const updateNotice = async (req, res) => {
  const { id } = req.params;
  const { title, date, description, from, to } = req.body;

  try {
    // Find the notice by ID and update it
    const updatedNotice = await Notice.findByIdAndUpdate(
      id,
      { title, date, description, from, to },
      { new: true } // Return the updated notice
    );

    if (!updatedNotice) {
      return res.status(404).json({
        success: false,
        message: "Notice not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Notice updated successfully",
      notice: updatedNotice,
    });
  } catch (error) {
    console.error("Error updating notice:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update notice",
    });
  }
};

// Delete a notice by ID
const deleteNotice = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the notice by ID and delete it
    const deletedNotice = await Notice.findByIdAndDelete(id);

    if (!deletedNotice) {
      return res.status(404).json({
        success: false,
        message: "Notice not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Notice deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting notice:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete notice",
    });
  }
};

// Create a new admin
const createAdmin = async (req, res) => {
  const { userName, email, password } = req.body;
  const role = "admin";

  try {
    // Check if the email or username already exists
    const existingAdmin = await Admin.findOne({
      $or: [{ email }, { userName }],
    });
    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: "Email or username already exists.",
      });
    }

    // Hash the password
    const hashPassword = await bcrypt.hash(password, 12);
    // Create a new admin
    const newAdmin = new Admin({
      userName,
      email,
      password: hashPassword,
      role,
    });

    // Save the admin to the database
    await newAdmin.save();

    const Mail = newAdmin.email;
    const userPassword = password; // Assuming password is stored securely and hashed
    
    // Example: Send an HTML email
    const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to ERP System</title>
      <style>
        /* General Styles */
        body {
          font-family: 'Poppins', sans-serif;
          background-color: #f4f4f4;
          margin: 0;
          padding: 0;
        }
    
        .email-container {
          max-width: 600px;
          margin: 20px auto;
          background-color: #ffffff;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
        }
    
        .header {
          background: linear-gradient(135deg, #007bff, #00bfff);
          color: #ffffff;
          text-align: center;
          padding: 25px;
          font-size: 24px;
          font-weight: bold;
          letter-spacing: 1px;
        }
    
        .content {
          padding: 25px;
          color: #333;
        }
    
        .content h2 {
          font-size: 22px;
          font-weight: 600;
          margin-bottom: 10px;
        }
    
        .content p {
          font-size: 16px;
          line-height: 1.8;
          color: #555;
        }
    
        .credentials {
          background-color: #f8f9fa;
          padding: 15px;
          border-radius: 8px;
          margin-top: 15px;
          font-size: 16px;
          font-weight: bold;
        }
    
        .cta-button {
          display: inline-block;
          margin-top: 20px;
          padding: 14px 28px;
          background-color: #007bff;
          color: #fffff;
          text-decoration: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: bold;
          transition: background-color 0.3s ease, transform 0.3s ease;
        }
    
        .cta-button:hover {
          background-color: #0056b3;
          transform: translateY(-3px);
        }
    
        .footer {
          text-align: center;
          padding: 20px;
          background-color: #f4f4f4;
          color: #666;
          font-size: 14px;
        }
    
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
    
        .animated {
          animation: fadeIn 1s ease-out;
        }
      </style>
    </head>
    <body>
      <div class="email-container animated">
        <!-- Header -->
        <div class="header">
          Welcome to Rasiklal M. Dhariwal Institute of Technology
        </div>
    
        <!-- Content -->
        <div class="content">
          <h2>Welcome to Our ERP System!</h2>
          <p>Dear ${newAdmin.userName},</p>
          <p>We are pleased to inform you that your account has been successfully created in the <strong>ERP System</strong> of Rasiklal M. Dhariwal Institute of Technology, Chinchwad.</p>
          
          <div class="credentials">
            <p><strong>Admin Login Credentials:</strong></p>
            <p>🔹 <strong>Email:</strong> ${Mail}</p>
            <p>🔹 <strong>Password:</strong> ${userPassword}</p>
          </div>
    
          <p>You can log in using the button below:</p>
          <a href="https://your-erp-system-link.com" class="cta-button">Login to ERP System</a>
    
          <p>If you have any questions or issues, please contact the administration.</p>
        </div>
    
        <!-- Footer -->
        <div class="footer">
          <p>© 2023 Rasiklal M. Dhariwal Institute of Technology, Chinchwad. All rights reserved.</p>
          <p>This is an automated email. Please do not reply.</p>
        </div>
      </div>
    </body>
    </html>
    `;
    
    // Send Email
    sendMail(Mail, 'Welcome to ERP System - Login Credentials', '', htmlContent)
      .then(() => console.log('HTML email sent successfully!'))
      .catch((error) => console.error('Failed to send HTML email:', error));
    
    

    res.status(201).json({
      success: true,
      message: "Admin created successfully",
      admin: newAdmin,
    });
  } catch (error) {
    console.error("Error creating admin:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create admin",
    });
  }
};

// Get all admins
const getAllAdmins = async (req, res) => {
  try {
    // Fetch all admins from the database
    const admins = await Admin.find();

    res.status(200).json({
      success: true,
      admins,
    });
  } catch (error) {
    console.error("Error fetching admins:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch admins",
    });
  }
};

// Get a single admin by ID
const getAdminById = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the admin by ID
    const admin = await Admin.findById(id);

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    res.status(200).json({
      success: true,
      admin,
    });
  } catch (error) {
    console.error("Error fetching admin:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch admin",
    });
  }
};

// Update an admin by ID
const updateAdmin = async (req, res) => {
  const { id } = req.params;
  const { userName, email, password, role } = req.body;

  try {
    // Find the admin by ID and update it
    const updatedAdmin = await Admin.findByIdAndUpdate(
      id,
      { userName, email, password, role },
      { new: true } // Return the updated admin
    );

    if (!updatedAdmin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Admin updated successfully",
      admin: updatedAdmin,
    });
  } catch (error) {
    console.error("Error updating admin:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update admin",
    });
  }
};

// Delete an admin by ID
const deleteAdmin = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the admin by ID and delete it
    const deletedAdmin = await Admin.findByIdAndDelete(id);

    if (!deletedAdmin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Admin deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting admin:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete admin",
    });
  }
};

// Create a new department
const createDepartment = async (req, res) => {
  const { department, departmentCode } = req.body;

  try {
    // Check if the department code already exists
    const existingDepartment = await Department.findOne({ departmentCode });
    if (existingDepartment) {
      return res.status(400).json({
        success: false,
        message: "Department code already exists.",
      });
    }

    // Create a new department
    const newDepartment = new Department({
      department,
      departmentCode,
    });

    // Save the department to the database
    await newDepartment.save();

    res.status(201).json({
      success: true,
      message: "Department created successfully",
      department: newDepartment,
    });
  } catch (error) {
    console.error("Error creating department:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create department",
    });
  }
};

// Get all departments
const getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    res.status(200).json({
      success: true,
      departments,
    });
  } catch (error) {
    console.error("Error fetching departments:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch departments",
    });
  }
};

// Get a single department by ID
const getDepartmentById = async (req, res) => {
  const { id } = req.params;

  try {
    const department = await Department.findById(id);
    if (!department) {
      return res.status(404).json({
        success: false,
        message: "Department not found",
      });
    }

    res.status(200).json({
      success: true,
      department,
    });
  } catch (error) {
    console.error("Error fetching department:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch department",
    });
  }
};

// Update a department by ID
const updateDepartment = async (req, res) => {
  const { id } = req.params;
  const { department, departmentCode } = req.body;

  try {
    const updatedDepartment = await Department.findByIdAndUpdate(
      id,
      { department, departmentCode },
      { new: true } // Return the updated document
    );

    if (!updatedDepartment) {
      return res.status(404).json({
        success: false,
        message: "Department not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Department updated successfully",
      department: updatedDepartment,
    });
  } catch (error) {
    console.error("Error updating department:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update department",
    });
  }
};

// Delete a department by ID
const deleteDepartment = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedDepartment = await Department.findByIdAndDelete(id);

    if (!deletedDepartment) {
      return res.status(404).json({
        success: false,
        message: "Department not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Department deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting department:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete department",
    });
  }
};

const createFaculty = async (req, res) => {
  try {
    const { userName, email, password, department } = req.body;

    // Validate required fields
    if (!userName || !email || !password || !department) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Hash the password
    const hashPassword = await bcrypt.hash(password, 12);

    // Check if the email already exists
    const existingFaculty = await Faculty.findOne({ email });
    if (existingFaculty) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Create a new faculty object
    const newFaculty = new Faculty({
      userName,
      email,
      password: hashPassword,
      department,
    });

    // Save the faculty to the database
    await newFaculty.save();


    const Mail = newFaculty.email;
const userPassword = password; // Assuming password is stored securely and hashed

// Example: Send an HTML email
const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to ERP System</title>
  <style>
    /* General Styles */
    body {
      font-family: 'Poppins', sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }

    .email-container {
      max-width: 600px;
      margin: 20px auto;
      background-color: #ffffff;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
    }

    .header {
      background: linear-gradient(135deg, #007bff, #00bfff);
      color: #ffffff;
      text-align: center;
      padding: 25px;
      font-size: 24px;
      font-weight: bold;
      letter-spacing: 1px;
    }

    .content {
      padding: 25px;
      color: #333;
    }

    .content h2 {
      font-size: 22px;
      font-weight: 600;
      margin-bottom: 10px;
    }

    .content p {
      font-size: 16px;
      line-height: 1.8;
      color: #555;
    }

    .credentials {
      background-color: #f8f9fa;
      padding: 15px;
      border-radius: 8px;
      margin-top: 15px;
      font-size: 16px;
      font-weight: bold;
    }

    .cta-button {
      display: inline-block;
      margin-top: 20px;
      padding: 14px 28px;
      background-color: #007bff;
      color: #fffff;
      text-decoration: none;
      border-radius: 8px;
      font-size: 16px;
      font-weight: bold;
      transition: background-color 0.3s ease, transform 0.3s ease;
    }

    .cta-button:hover {
      background-color: #0056b3;
      transform: translateY(-3px);
    }

    .footer {
      text-align: center;
      padding: 20px;
      background-color: #f4f4f4;
      color: #666;
      font-size: 14px;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .animated {
      animation: fadeIn 1s ease-out;
    }
  </style>
</head>
<body>
  <div class="email-container animated">
    <!-- Header -->
    <div class="header">
      Welcome to Rasiklal M. Dhariwal Institute of Technology
    </div>

    <!-- Content -->
    <div class="content">
      <h2>Welcome to Our ERP System!</h2>
      <p>Dear ${newFaculty.userName},</p>
      <p>We are pleased to inform you that your account has been successfully created in the <strong>ERP System</strong> of Rasiklal M. Dhariwal Institute of Technology, Chinchwad.</p>
      
      <div class="credentials">
        <p><strong>Login Credentials:</strong></p>
        <p>🔹 <strong>Email:</strong> ${Mail}</p>
        <p>🔹 <strong>Password:</strong> ${userPassword}</p>
      </div>

      <p>You can log in using the button below:</p>
      <a href="https://your-erp-system-link.com" class="cta-button">Login to ERP System</a>

      <p>If you have any questions or issues, please contact the administration.</p>
    </div>

    <!-- Footer -->
    <div class="footer">
      <p>© 2023 Rasiklal M. Dhariwal Institute of Technology, Chinchwad. All rights reserved.</p>
      <p>This is an automated email. Please do not reply.</p>
    </div>
  </div>
</body>
</html>
`;

// Send Email
sendMail(Mail, 'Welcome to ERP System - Login Credentials', '', htmlContent)
  .then(() => console.log('HTML email sent successfully!'))
  .catch((error) => console.error('Failed to send HTML email:', error));



    return res
      .status(201)
      .json({ message: "Faculty created successfully", faculty: newFaculty });
  } catch (error) {
    console.error("Error in createFaculty:", error);
    return res
      .status(500)
      .json({ message: "Failed to create faculty", error: error.message });
  }
};

// Update Faculty details
const updateFaculty = async (req, res) => {
  try {
    const { id } = req.params;
    const { userName, department } = req.body;

    const updatedFaculty = await Faculty.findByIdAndUpdate(
      id,
      { userName, department },
      { new: true }
    );

    if (!updatedFaculty) {
      return res.status(404).json({ message: "Faculty not found" });
    }

    return res
      .status(200)
      .json({
        message: "Faculty updated successfully",
        faculty: updatedFaculty,
      });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to update faculty", error: error.message });
  }
};

// Delete Faculty
const deleteFaculty = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedFaculty = await Faculty.findByIdAndDelete(id);

    if (!deletedFaculty) {
      return res.status(404).json({ message: "Faculty not found" });
    }

    return res.status(200).json({ message: "Faculty deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to delete faculty", error: error.message });
  }
};

// Get all Faculty
const getAllFaculties = async (req, res) => {
  try {
    const faculties = await Faculty.find();

    return res.status(200).json(faculties);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to fetch faculties", error: error.message });
  }
};

// Create a new subject
const createSubject = async (req, res) => {
  try {
    const { subjectName, subjectCode, department, year, semester } = req.body;

    // Validate required fields
    if (!subjectName || !subjectCode || !department || !year || !semester) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if the subject code already exists
    const existingSubject = await Subject.findOne({ subjectCode });
    if (existingSubject) {
      return res.status(400).json({ message: "Subject code already exists" });
    }

    // Create a new subject
    const newSubject = new Subject({
      subjectName,
      subjectCode,
      department,
      year,
      semester
    });

    // Save the subject to the database
    await newSubject.save();

    // Find all students in the same department and year
    const students = await Student.find({ department, year,semester });
    // Add the new subject to each student's subjects array
    if (students.length > 0) {
      for (let student of students) {
        student.subjects.push(newSubject._id);
        await student.save();
      }
    }

    return res
      .status(201)
      .json({ message: "Subject created successfully", subject: newSubject });
  } catch (error) {
    console.error("Error creating subject:", error);
    return res
      .status(500)
      .json({ message: "Failed to create subject", error: error.message });
  }
};

// Get all subjects
const getAllSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find();
    return res.status(200).json(subjects);
  } catch (error) {
    console.error("Error fetching subjects:", error);
    return res
      .status(500)
      .json({ message: "Failed to fetch subjects", error: error.message });
  }
};

// Delete a subject by ID
const deleteSubject = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedSubject = await Subject.findByIdAndDelete(id);

    if (!deletedSubject) {
      return res.status(404).json({ message: "Subject not found" });
    }

    return res.status(200).json({ message: "Subject deleted successfully" });
  } catch (error) {
    console.error("Error deleting subject:", error);
    return res
      .status(500)
      .json({ message: "Failed to delete subject", error: error.message });
  }
};

//Event Controllers

// Get all events
const getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new event
const createEvent = async (req, res) => {
  try {
    const { title, date, location } = req.body;
    //const createdBy= req.user.id;

    const newEvent = new Event({ title, date, location });
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update event
const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Event ID is required" });
    }

    const updatedEvent = await Event.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json(updatedEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete event
const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    await Event.findByIdAndDelete(id);
    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Add a new student
const addStudent = async (req, res) => {
  try {
    const {
      userName,
      email,
      password,
      name,
      year,
      department,
      batch,
      dob,
      gender,
      fatherName,
      motherName,
      contactNumber,
      fatherContactNumber,
      class1,
      avatar,
      semester
    } = req.body;

    // Validate required fields
    if (
      !userName ||
      !email ||
      !password ||
      !name ||
      !year ||
      !department ||
      !class1 || !semester
    ) {
      return res
        .status(400)
        .json({ message: "All required fields must be provided." });
    }

    // Check if the email or username already exists
    const existingStudent = await Student.findOne({
      $or: [{ email }, { userName }],
    });
    if (existingStudent) {
      return res
        .status(400)
        .json({ message: "Email or username already exists." });
    }

    // Hash the password
    const hashPassword = await bcrypt.hash(password, 12);

    // Create a new student
    const newStudent = new Student({
      userName,
      email,
      password: hashPassword,
      name,
      year,
      department,
      batch,
      dob,
      gender,
      fatherName,
      motherName,
      contactNumber,
      fatherContactNumber,
      avatar,
      class1,
      semester
    });

    // Save the student to the database
    await newStudent.save();

    // Find subjects based on department and year
    const subjects = await Subject.find({ department, year,semester });
    if (subjects.length > 0) {
      // Add subject IDs to the student's subjects array
      newStudent.subjects = subjects.map((subject) => subject._id);
      await newStudent.save(); // Save the updated student with subjects
    }



    const StudMail = newStudent.email;
const userPassword = password; // Assuming password is stored securely and hashed

// Example: Send an HTML email
const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to ERP System</title>
  <style>
    /* General Styles */
    body {
      font-family: 'Poppins', sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }

    .email-container {
      max-width: 600px;
      margin: 20px auto;
      background-color: #ffffff;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
    }

    .header {
      background: linear-gradient(135deg, #007bff, #00bfff);
      color: #ffffff;
      text-align: center;
      padding: 25px;
      font-size: 24px;
      font-weight: bold;
      letter-spacing: 1px;
    }

    .content {
      padding: 25px;
      color: #333;
    }

    .content h2 {
      font-size: 22px;
      font-weight: 600;
      margin-bottom: 10px;
    }

    .content p {
      font-size: 16px;
      line-height: 1.8;
      color: #555;
    }

    .credentials {
      background-color: #f8f9fa;
      padding: 15px;
      border-radius: 8px;
      margin-top: 15px;
      font-size: 16px;
      font-weight: bold;
    }

    .cta-button {
      display: inline-block;
      margin-top: 20px;
      padding: 14px 28px;
      background-color: #007bff;
      color: #ffffff;
      text-decoration: none;
      border-radius: 8px;
      font-size: 16px;
      font-weight: bold;
      transition: background-color 0.3s ease, transform 0.3s ease;
    }

    .cta-button:hover {
      background-color: #0056b3;
      transform: translateY(-3px);
    }

    .footer {
      text-align: center;
      padding: 20px;
      background-color: #f4f4f4;
      color: #666;
      font-size: 14px;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .animated {
      animation: fadeIn 1s ease-out;
    }
  </style>
</head>
<body>
  <div class="email-container animated">
    <!-- Header -->
    <div class="header">
      Welcome to Rasiklal M. Dhariwal Institute of Technology
    </div>

    <!-- Content -->
    <div class="content">
      <h2>Welcome to Our ERP System!</h2>
      <p>Dear ${newStudent.name},</p>
      <p>We are pleased to inform you that your account has been successfully created in the <strong>ERP System</strong> of Rasiklal M. Dhariwal Institute of Technology, Chinchwad.</p>
      
      <div class="credentials">
        <p><strong>Login Credentials:</strong></p>
        <p>🔹 <strong>Email:</strong> ${StudMail}</p>
        <p>🔹 <strong>Password:</strong> ${userPassword}</p>
      </div>

      <p>You can log in using the button below:</p>
      <a href="https://your-erp-system-link.com" class="cta-button">Login to ERP System</a>

      <p>If you have any questions or issues, please contact the administration.</p>
    </div>

    <!-- Footer -->
    <div class="footer">
      <p>© 2023 Rasiklal M. Dhariwal Institute of Technology, Chinchwad. All rights reserved.</p>
      <p>This is an automated email. Please do not reply.</p>
    </div>
  </div>
</body>
</html>
`;

// Send Email
sendMail(StudMail, 'Welcome to ERP System - Login Credentials', '', htmlContent)
  .then(() => console.log('HTML email sent successfully!'))
  .catch((error) => console.error('Failed to send HTML email:', error));







    return res
      .status(201)
      .json({ message: "Student added successfully", student: newStudent });

     

  } catch (error) {
    console.error("Error adding student:", error);
    return res
      .status(500)
      .json({ message: "Failed to add student", error: error.message });
  }
};

// Get all students
const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().populate("subjects"); // Populate subjects
    return res.status(200).json(students);
  } catch (error) {
    console.error("Error fetching students:", error);
    return res
      .status(500)
      .json({ message: "Failed to fetch students", error: error.message });
  }
};
// Search students by department and year
const searchStudents = async (req, res) => {
  try {
    const { department, year } = req.query;

    const query = {};
    if (department) query.department = department;
    if (year) query.year = year;

    const students = await Student.find(query).populate("subjects"); // Populate subjects
    return res.status(200).json(students);
  } catch (error) {
    console.error("Error searching students:", error);
    return res
      .status(500)
      .json({ message: "Failed to search students", error: error.message });
  }
};

// Delete a student by ID
const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedStudent = await Student.findByIdAndDelete(id);

    if (!deletedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    return res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    console.error("Error deleting student:", error);
    return res
      .status(500)
      .json({ message: "Failed to delete student", error: error.message });
  }
};

module.exports = {
  getAdminProfile,
  updateAdminProfile,
  createNotice,
  getAllNotices,
  getNoticeById,
  updateNotice,
  deleteNotice,
  createAdmin,
  getAllAdmins,
  getAdminById,
  updateAdmin,
  deleteAdmin,
  createDepartment,
  getAllDepartments,
  getDepartmentById,
  updateDepartment,
  deleteDepartment,
  createFaculty,
  updateFaculty,
  deleteFaculty,
  getAllFaculties,
  createSubject,
  getAllSubjects,
  deleteSubject,
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  addStudent,
  getAllStudents,
  searchStudents,
  deleteStudent,
};
