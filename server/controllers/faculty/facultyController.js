const Department = require("../../models/Department");
const Subject = require("../../models/Subject");
const Student = require("../../models/Student");
const Attendance = require("../../models/Attendence.js");
const Faculty = require("../../models/Faculty.js");

const fs = require("fs");
const path = require("path");
const Notes = require("../../models/Note.js");
const cloudinary = require("../../utils/cloudinary.js");
const Timetable = require("../../models/Timetable.js");
const Notice = require("../../models/Notice.js");
const FeeStructure = require("../../models/FeeStructure.js");
const Test = require("../../models/Test.js");
const TestResult = require("../../models/Marks.js");
const Classroom  = require("../../models/Classroom.js");

// export const updatedPassword = async (req, res) => {
//   try {
//     const { newPassword, confirmPassword, email } = req.body;
//     const errors = { mismatchError: String };
//     if (newPassword !== confirmPassword) {
//       errors.mismatchError =
//         "Your password and confirmation password do not match";
//       return res.status(400).json(errors);
//     }

//     const faculty = await Faculty.findOne({ email });
//     let hashedPassword;
//     hashedPassword = await bcrypt.hash(newPassword, 10);
//     faculty.password = hashedPassword;
//     await faculty.save();
//     if (faculty.passwordUpdated === false) {
//       faculty.passwordUpdated = true;
//       await faculty.save();
//     }

//     res.status(200).json({
//       success: true,
//       message: "Password updated successfully",
//       response: faculty,
//     });
//   } catch (error) {
//     const errors = { backendError: String };
//     errors.backendError = error;
//     res.status(500).json(errors);
//   }
// };

// export const createTest = async (req, res) => {
//   try {
//     const { subjectCode, department, year, section, date, test, totalMarks } =
//       req.body;
//     const errors = { testError: String };
//     const existingTest = await Test.findOne({
//       subjectCode,
//       department,
//       year,
//       section,
//       test,
//     });
//     if (existingTest) {
//       errors.testError = "Given Test is already created";
//       return res.status(400).json(errors);
//     }

//     const newTest = await new Test({
//       totalMarks,
//       section,
//       test,
//       date,
//       department,
//       subjectCode,
//       year,
//     });

//     await newTest.save();
//     const students = await Student.find({ department, year, section });
//     return res.status(200).json({
//       success: true,
//       message: "Test added successfully",
//       response: newTest,
//     });
//   } catch (error) {
//     const errors = { backendError: String };
//     errors.backendError = error;
//     res.status(500).json(errors);
//   }
// };

// export const getTest = async (req, res) => {
//   try {
//     const { department, year, section } = req.body;

//     const tests = await Test.find({ department, year, section });

//     res.status(200).json({ result: tests });
//   } catch (error) {
//     const errors = { backendError: String };
//     errors.backendError = error;
//     res.status(500).json(errors);
//   }
// };

// export const getStudent = async (req, res) => {
//   try {
//     const { department, year, section } = req.body;
//     const errors = { noStudentError: String };
//     const students = await Student.find({ department, year, section });
//     if (students.length === 0) {
//       errors.noStudentError = "No Student Found";
//       return res.status(404).json(errors);
//     }

//     res.status(200).json({ result: students });
//   } catch (error) {
//     const errors = { backendError: String };
//     errors.backendError = error;
//     res.status(500).json(errors);
//   }
// };

// export const uploadMarks = async (req, res) => {
//   try {
//     const { department, year, section, test, marks } = req.body;

//     const errors = { examError: String };
//     const existingTest = await Test.findOne({
//       department,
//       year,
//       section,
//       test,
//     });
//     const isAlready = await Marks.find({
//       exam: existingTest._id,
//     });

//     if (isAlready.length !== 0) {
//       errors.examError = "You have already uploaded marks of given exam";
//       return res.status(400).json(errors);
//     }

//     for (var i = 0; i < marks.length; i++) {
//       const newMarks = await new Marks({
//         student: marks[i]._id,
//         exam: existingTest._id,
//         marks: marks[i].value,
//       });
//       await newMarks.save();
//     }
//     res.status(200).json({ message: "Marks uploaded successfully" });
//   } catch (error) {
//     const errors = { backendError: String };
//     errors.backendError = error;
//     res.status(500).json(errors);
//   }
// };

// const markAttendance = async (req, res) => {
//   try {
//     const { selectedStudents, subject, department, year, class1, date } = req.body;

//     // Step 1: Find the subject ID based on the subject name
//     const subjectDoc = await Subject.findOne({ subjectName: subject });
//     if (!subjectDoc) {
//       return res.status(404).json({ message: "Subject not found" });
//     }
//     const subjectId = subjectDoc._id;

//     // Step 2: Find students based on the provided filters
//     const students = await Student.find({ department, year, class1 });
//     if (!students || students.length === 0) {
//       return res.status(404).json({ message: "No students found for these filters" });
//     }

//     // Step 3: Create attendance records for selected students
//     const attendanceRecords = [];
//     for (const student of students) {
//       const isPresent = selectedStudents.includes(student._id.toString());

//       const attendanceRecord = new Attendence({
//         studentId: student._id, // Use studentId instead of student
//         subject: subjectId,
//         date,
//         lectureAttended: isPresent ? 1 : 0,
//         totalLecturesByFaculty: 1, // Increment total lectures for this subject
//       });

//       await attendanceRecord.save();
//       attendanceRecords.push(attendanceRecord);
//     }

//     // Step 4: Return success response
//     res.status(200).json({
//       message: "Attendance marked successfully",
//       attendanceRecords,
//     });
//   } catch (error) {
//     console.error("Error marking attendance:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

//new

// Mark Attendance
// const markAttendance = async (req, res) => {
//   try {
//     const { selectedStudents, subject, department, year, class1, date } =
//       req.body;

//     // Find the subject ID based on the subject name
//     const subjectDoc = await Subject.findOne({ subjectName: subject });
//     if (!subjectDoc) {
//       return res.status(404).json({ message: "Subject not found" });
//     }
//     const subjectId = subjectDoc._id;

//     // Fetch students for given filters
//     const students = await Student.find({ department, year, class1 });
//     if (!students || students.length === 0) {
//       return res
//         .status(404)
//         .json({ message: "No students found for these filters" });
//     }

//     // Convert date to standard format
//     const attendanceDate = new Date(date).toISOString();

//     // Remove previous attendance records for this subject and date
//     await Attendence.deleteMany({ subject: subjectId, date: attendanceDate });

//     // Store attendance in a proper format
//     const attendanceRecords = students.map((student) => ({
//       studentId: student._id,
//       subject: subjectId,
//       date: attendanceDate,
//       lectureAttended: selectedStudents.includes(student._id.toString())
//         ? 1
//         : 0,
//       totalLecturesByFaculty: 1,
//     }));

//     // Insert all attendance records at once for better performance
//     await Attendence.insertMany(attendanceRecords);

//     // Return success response
//     res.status(200).json({
//       message: "Attendance marked successfully",
//       attendanceRecords,
//     });
//   } catch (error) {
//     console.error("Error marking attendance:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// // Fetch Attendance
// const getAttendance = async (req, res) => {
//   try {
//     const { department, year, class1, subject, date } = req.body;

//     console.log("Fetching attendance for:", {
//       department,
//       year,
//       class1,
//       subject,
//       date,
//     });

//     // Find the subject ID based on the subject name
//     const subjectDoc = await Subject.findOne({ subjectName: subject });
//     if (!subjectDoc) {
//       return res.status(404).json({ message: "Subject not found" });
//     }
//     const subjectId = subjectDoc._id;

//     console.log("Subject ID:", subjectId);

//     // Find students based on the provided filters
//     const students = await Student.find({ department, year, class1 });
//     if (!students || students.length === 0) {
//       return res
//         .status(404)
//         .json({ message: "No students found for these filters" });
//     }

//     console.log("Students found:", students.length);

//     // Convert date to standard format
//     const attendanceDate = new Date(date).toISOString();

//     console.log("Attendance Date:", attendanceDate);

//     // Fetch attendance records for the students
//     const attendanceRecords = await Attendence.find({
//       studentId: { $in: students.map((student) => student._id) },
//       subject: subjectId,
//       date: attendanceDate,
//     }).populate("studentId", "name rollNo");

//     console.log("Attendance Records:", attendanceRecords);

//     // Return the attendance records in response
//     res.json({ attendanceRecords });
//   } catch (error) {
//     console.error("Error fetching attendance:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// // Update Attendance
// const updateAttendance = async (req, res) => {
//   try {
//     const { selectedStudents, subject, department, year, class1, date } =
//       req.body;

//     // Find the subject ID based on the subject name
//     const subjectDoc = await Subject.findOne({ subjectName: subject });
//     if (!subjectDoc) {
//       return res.status(404).json({ message: "Subject not found" });
//     }
//     const subjectId = subjectDoc._id;

//     // Fetch students for given filters
//     const students = await Student.find({ department, year, class1 });
//     if (!students || students.length === 0) {
//       return res
//         .status(404)
//         .json({ message: "No students found for these filters" });
//     }

//     // Convert date to standard format
//     const attendanceDate = new Date(date).toISOString();

//     // Update attendance records for the students
//     for (const student of students) {
//       const isPresent = selectedStudents.includes(student._id.toString());

//       await Attendence.updateOne(
//         { studentId: student._id, subject: subjectId, date: attendanceDate },
//         { lectureAttended: isPresent ? 1 : 0 },
//         { upsert: true } // Create a new record if it doesn't exist
//       );
//     }

//     // Return success response
//     res.status(200).json({
//       message: "Attendance updated successfully",
//     });
//   } catch (error) {
//     console.error("Error updating attendance:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };


// Backend Controller Functions
const markAttendance = async (req, res) => {
  try {
    const { semester, subject, date, presentStudents, totalStudents } = req.body;
    const faculty = req.user.id;

    // Format date to "YYYY-MM-DD"
    const formattedDate = new Date(date).toISOString().split("T")[0];

    // Find or update attendance record
    const attendance = await Attendance.findOneAndUpdate(
      { subject, date: formattedDate, faculty },
      {
        semester,
        presentStudents,
        totalStudents,
        faculty,
        date: formattedDate,
      },
      { upsert: true, new: true }
    );

    res.status(200).json({
      message: "Attendance marked successfully",
      attendance
    });
  } catch (error) {
    console.error("Error marking attendance:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const mongoose = require("mongoose");

const getAttendance = async (req, res) => {
  try {
    const { subject, date } = req.body;
    const faculty = req.user.id;

    // Format date to "YYYY-MM-DD"
    const queryDate = new Date(date).toISOString().split("T")[0];

    console.log("Query Parameters:", { subject, date: queryDate, faculty });

    // Convert subject and faculty to ObjectId properly
    const subjectId = new mongoose.Types.ObjectId(subject);
    const facultyId = new mongoose.Types.ObjectId(faculty);

    // Find attendance record
    const attendance = await Attendance.findOne({
      subject: subjectId,
      date: queryDate,
      faculty: facultyId
    }).populate("presentStudents", "name rollNo");

    console.log("Attendance Found:", attendance);

    if (!attendance) {
      return res.status(404).json({ message: "Attendance not found" });
    }

    res.json({ attendance });
  } catch (error) {
    console.error("Error fetching attendance:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



//Get all students






const getAllStudentsForAtt = async (req, res) => {
  const { semester,class1 } = req.body;

  try {
    if (!semester || !class1) {
      return res.status(400).json({ message: "Semester is required" });
    }

    const students = await Student.find({ semester, class1});
    res.status(200).json({ students });
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ message: "Internal server error" });
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

// Get all subjects
const getAllDeptSubjects = async (req, res) => {
  const { department } = req.params;
  try {
    const subjects = await Subject.find({ department });
    return res.status(200).json(subjects);
  } catch (error) {
    console.error("Error fetching subjects:", error);
    return res
      .status(500)
      .json({ message: "Failed to fetch subjects", error: error.message });
  }
};



// Fetch faculty profile
const getFacultyProfile = async (req, res) => {
  try {
    const facultyId = req.user.id; // Assuming the faculty ID is stored in the request object after authentication
    const faculty = await Faculty.findById(facultyId).select("-password"); // Exclude password from the response

    if (!faculty) {
      return res.status(404).json({ message: "Faculty not found" });
    }

    res.status(200).json(faculty);
  } catch (error) {
    console.error("Error fetching faculty profile:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update faculty profile
const updateFacultyProfile = async (req, res) => {
  try {
    const facultyId = req.user.id; // Assuming the faculty ID is stored in the request object after authentication
    const updates = req.body;

    // Update the faculty profile
    const updatedFaculty = await Faculty.findByIdAndUpdate(facultyId, updates, {
      new: true, // Return the updated document
      runValidators: true, // Run schema validators
    }).select("-password"); // Exclude password from the response

    if (!updatedFaculty) {
      return res.status(404).json({ message: "Faculty not found" });
    }

    res.status(200).json(updatedFaculty);
  } catch (error) {
    console.error("Error updating faculty profile:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get all notes
const getAllNotes = async (req, res) => {
  try {
    const notes = await Notes.find().populate("uploadedBy", "name");
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAllSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find();

    res.status(200).json({
      success: true,
      message: "Subjects fetched successfully",
      subjects,
    });
  } catch (error) {
    console.error("Error fetching subjects:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch subjects",
    });
  }
};

// Upload Notes Controller
const uploadNotes = async (req, res) => {
  const { title, subject, department } = req.body;
  const file = req.file;

  try {
    // Validate required fields
    if (!title || !subject || !department || !file) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields and a file.",
      });
    }

    // Check if the subject and department exist in the database
    const subjectExists = await Subject.findOne({ subjectName: subject });
    const departmentExists = await Department.findOne({ department });

    if (!subjectExists || !departmentExists) {
      return res.status(404).json({
        success: false,
        message: "Subject or Department not found.",
      });
    }

    // Upload file to Cloudinary
    const result = await cloudinary.uploader.upload(file.path, {
      folder: "Notes", // Optional: Organize files in a folder
      resource_type: "raw", // Automatically detect file type (PDF, DOC, etc.)
    });

    // Create a new note entry in the database
    const newNote = new Notes({
      title,
      subject,
      department,
      fileUrl: result.secure_url, // Save the Cloudinary URL
      uploadedBy: req.user.id, // Assuming you have user authentication
    });

    await newNote.save();

    fs.unlinkSync(file.path);

    res.status(201).json({
      success: true,
      message: "Notes uploaded successfully!",
      data: newNote,
    });
  } catch (error) {
    console.error("Error uploading notes:", error);
    res.status(500).json({
      success: false,
      message: "Failed to upload notes.",
      error: error.message,
    });
  }
};

// Fetch students based on faculty's department and selected class
const getStudents = async (req, res) => {
  try {
    console.log("Request User:", req.user); // Debugging line
    const { class1: selectedClass } = req.body;

    // Get faculty's department from req.user
    const faculty = await Faculty.findById(req.user.id);
    if (!faculty) {
      return res.status(404).json({ message: "Faculty not found" });
    }

    // Fetch students based on department & selected class
    const students = await Student.find({
      department: faculty.department,
      class1: selectedClass,
    }).select("rollNo name email");

    res.status(200).json({ students });
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const uploadTimetable = async (req, res) => {
  try {
    const { option, year, classNumber } = req.body;

    // Fetch faculty's department
    const faculty = await Faculty.findById(req.user.id);
    if (!faculty) {
      return res.status(404).json({ message: "Faculty not found" });
    }

    // Upload file to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "Timetable", // Optional: Organize files in a folder
      resource_type: "raw", // Automatically detect file type (PDF, DOC, etc.)
    });

    // Save file details to the database
    const newFile = new Timetable({
      option,
      year,
      department: faculty.department, // Use faculty's department
      classNumber,
      fileUrl: result.secure_url,
      facultyId: req.user.id, // Associate with faculty
    });

    await newFile.save();
    res
      .status(201)
      .json({ message: "File uploaded successfully!", file: newFile });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ message: "Error uploading file", error });
  }
};

const getTimetable = async (req, res) => {
  try {
    // Fetch faculty's department
    const faculty = await Faculty.findById(req.user.id);
    if (!faculty) {
      return res.status(404).json({ message: "Faculty not found" });
    }

    // Fetch files for the faculty's department
    const files = await Timetable.find({ department: faculty.department });
    res.status(200).json(files);
  } catch (error) {
    console.error("Error fetching files:", error);
    res.status(500).json({ message: "Error fetching files", error });
  }
};

// Create a new notice
const createNotice = async (req, res) => {
  try {
    const { title, description, date, from, to } = req.body;
    const newNotice = new Notice({ title, description, date, from, to });
    await newNotice.save();
    res.status(201).json({ success: true, notice: newNotice });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error creating notice" });
  }
};

// Get all notices
const getAllNotices = async (req, res) => {
  try {
    const notices = await Notice.find({ from: "faculty" });
    res.status(200).json({ success: true, notices });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching notices" });
  }
};

// Update a notice by ID
const updateNotice = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, date, from, to } = req.body;
    const updatedNotice = await Notice.findByIdAndUpdate(
      id,
      { title, description, date, from, to },
      { new: true }
    );
    res.status(200).json({ success: true, notice: updatedNotice });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating notice" });
  }
};

// Delete a notice by ID
const deleteNotice = async (req, res) => {
  try {
    const { id } = req.params;
    await Notice.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "Notice deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting notice" });
  }
};

// Get all getFacultyNotices
const getFacultyNotices = async (req, res) => {
  try {
    // Fetch notices where 'to' is either "faculty" or "all"
    const notices = await Notice.find({ to: { $in: ["faculty", "all"] } });

    res.status(200).json({ success: true, notices });
  } catch (error) {
    console.error("Error fetching faculty notices:", error);
    res.status(500).json({ success: false, message: "Error fetching notices" });
  }
};

// Get counts for students, faculties, and departments
const DashboardCount = async (req, res) => {
  try {
    const totalStudents = await Student.countDocuments();
    const totalFaculties = await Faculty.countDocuments();
    const totalDepartments = await Department.countDocuments();
    const totalSubjects = await Subject.countDocuments();

    res.status(200).json({
      success: true,
      counts: {
        students: totalStudents,
        faculties: totalFaculties,
        departments: totalDepartments,
        subjects: totalSubjects,
      },
    });
  } catch (error) {
    console.error("Error fetching counts:", error);
    res.status(500).json({ success: false, message: "Error fetching data" });
  }
};

// Upload fee structure
const uploadFeeStructure = async (req, res) => {
  try {
    const { batch, year } = req.body;
    //const fileUrl = req.file.path; // Cloudinary file URL

    // Get the faculty's department from req.user.id
    const faculty = await Faculty.findById(req.user.id);
    if (!faculty) {
      return res.status(404).json({ message: "Faculty not found" });
    }

    // Upload file to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "Fees", // Optional: Organize files in a folder
      resource_type: "raw", // Automatically detect file type (PDF, DOC, etc.)
    });

    const newFeeStructure = new FeeStructure({
      department: faculty.department,
      batch,
      year,
      fileUrl: result.secure_url,
      createdBy: req.user.id,
    });

    await newFeeStructure.save();
    res.status(201).json(newFeeStructure);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all fee structures for the faculty's department
const getFeeStructures = async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.user.id);
    if (!faculty) {
      return res.status(404).json({ message: "Faculty not found" });
    }

    const feeStructures = await FeeStructure.find({
      department: faculty.department,
    });
    res.json(feeStructures);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch departments and subjects
const deptSub = async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.user.id);
    if (!faculty) {
      return res.status(404).json({ message: "Faculty not found" });
    }

    const subjects = await Subject.find({ department: faculty.department });
    res.status(200).json(subjects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create Test
const createTest = async (req, res) => {
  try {
    const { testTitle, totalMarks, subject, year, class1 } = req.body;

    const faculty = await Faculty.findById(req.user.id);
    if (!faculty) {
      return res.status(404).json({ message: "Faculty not found" });
    }

    const newTest = new Test({
      testTitle,
      totalMarks,
      department: faculty.department,
      subject,
      year,
      class: class1,
      createdBy: req.user.id,
    });

    await newTest.save();
    res.status(201).json(newTest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch all tests
const getTests = async (req, res) => {
  try {
    const tests = await Test.find({ createdBy: req.user.id });
    res.status(200).json(tests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch students for a test
const fetchStudentsForTest = async (req, res) => {
  try {
    const { testId } = req.params;
    const test = await Test.findById(testId);
    if (!test) {
      return res.status(404).json({ message: "Test not found" });
    }

    const students = await Student.find({
      department: test.department,
      year: test.year,
      class1: test.class,
    });

    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Upload test results
// const uploadTestResult = async (req, res) => {
//   try {
//     const results = req.body;

//     const savedResults = await TestResult.insertMany(results);
//     res.status(201).json(savedResults);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

const uploadTestResult = async (req, res) => {
  const marksData = req.body; // Array of test results

  try {
    // Use bulkWrite to upsert test results
    const bulkOps = marksData.map((result) => ({
      updateOne: {
        filter: { testId: result.testId, studentId: result.studentId },
        update: { $set: result },
        upsert: true, // Insert if not found, update if found
      },
    }));

    await TestResult.bulkWrite(bulkOps);

    res.status(200).json({ message: "Test results uploaded/updated successfully!" });
  } catch (error) {
    console.error("Error uploading/updating test results:", error);
    res.status(500).json({ message: "Failed to upload/update test results" });
  }
};


// Fetch students with their marks for a specific test
const getStudentsForTest = async (req, res) => {
  const { testId } = req.params;

  try {
    // Fetch all students
    const students = await Student.find({});

    // Fetch test results for the selected test
    const testResults = await TestResult.find({ testId });

    // Map students with their marks (if available)
    const studentsWithMarks = students.map((student) => {
      const result = testResults.find((result) => result.studentId.equals(student._id));
      return {
        _id: student._id,
        name: student.name,
        marksObtained: result ? result.marksObtained : null,
      };
    });

    res.status(200).json(studentsWithMarks);
  } catch (error) {
    console.error("Error fetching students with marks:", error);
    res.status(500).json({ message: "Failed to fetch students with marks" });
  }
};


//classroom
const createClassroom = async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.user.id);
    if (!faculty) {
      return res.status(404).json({ message: 'Faculty not found' });
    }

    const { semester, subject, class: classNumber, googleClassCode, inviteLink, description } = req.body;

    // Validate required fields
    if (!semester || !subject || !classNumber || !googleClassCode || !inviteLink || !description) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if a classroom with the same semester, class, subject, and department already exists
    const existingClassroom = await Classroom.findOne({
      semester,
      subject,
      department: faculty.department, // Ensure the classroom belongs to the same department
      class: classNumber,
      faculty: req.user.id, // Ensure the classroom belongs to the same faculty
    });

    if (existingClassroom) {
      return res.status(409).json({ message: 'Classroom already exists for this semester, class, and subject' });
    }

    // Create the new classroom
    const classroom = await Classroom.create({
      faculty: req.user.id,
      department: faculty.department,
      semester,
      subject,
      class: classNumber,
      googleClassCode,
      inviteLink,
      description,
    });

    res.status(201).json(classroom);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const updateClassroom = async (req, res) => {
  try {
    const classroom = await Classroom.findOneAndUpdate(
      { _id: req.params.id, faculty: req.user.id },
      req.body,
      { new: true }
    );
    if (!classroom) {
      return res.status(404).json({ message: 'Classroom not found' });
    }
    res.json(classroom);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteClassroom = async (req, res) => {
  try {
    const classroom = await Classroom.findOneAndDelete({
      _id: req.params.id,
      faculty: req.user.id
    });
    if (!classroom) {
      return res.status(404).json({ message: 'Classroom not found' });
    }
    res.json({ message: 'Classroom deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getClassrooms = async (req, res) => {
  try {
    const user = await Faculty.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'Faculty not found' });
    }

    const query = {
      department: user.department,
      faculty: user._id
    };

    const classrooms = await Classroom.find(query);
    res.json(classrooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch subjects for faculty
const getSubs= async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.user.id);
    if (!faculty) {
      return res.status(404).json({ message: 'Faculty not found' });
    }

    const subjects = await Subject.find({
      department: faculty.department,
    });

    res.json(subjects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const getSubjectsFromSem = async (req, res) => {
  try {
    const { semester } = req.params;
    const fac= await Faculty.findById(req.user.id);
    const subjects = await Subject.find({ semester, department:fac.department});
    res.status(200).json({ subjects });
  } catch (error) {
    console.error("Error fetching subjects:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};




module.exports = {
  getSubjectsFromSem,
  getAllDepartments,
  markAttendance,
  getAllDeptSubjects,
  getAllStudentsForAtt,
  getAttendance,
  getFacultyProfile,
  updateFacultyProfile,
  uploadNotes,
  getAllNotes,
  getAllSubjects,
  getStudents,
  uploadTimetable,
  getTimetable,
  deleteNotice,
  updateNotice,
  getAllNotices,
  createNotice,
  getFacultyNotices,
  DashboardCount,
  uploadFeeStructure,
  getFeeStructures,
  createTest,
  uploadTestResult,
  deptSub,
  getTests,
  fetchStudentsForTest,
  getStudentsForTest,
  getClassrooms,
  deleteClassroom,
  updateClassroom,
  createClassroom,
  getSubs



};
