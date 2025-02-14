const Event = require("../../models/Event");
const Notice = require("../../models/Notice");
const Student = require("../../models/Student");
const Timetable = require("../../models/Timetable");
const TestResult = require("../../models/Marks");
const Test = require("../../models/Test");
const FeeStructure = require("../../models/FeeStructure");
const Faculty = require("../../models/Faculty");
const Classroom = require("../../models/Classroom");
const sendMail = require("../../utils/mailSender");
const Subject = require("../../models/Subject");
const Attendance = require("../../models/Attendence");





// Get Student Profile
const getStudentProfile = async (req, res) => {
  try {
    const student = await Student.findById(req.user.id).select("-password");
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json(student);
  } catch (error) {
    console.error("Error fetching student profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update Student Profile
const updateStudentProfile = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.user.id, req.body, {
      new: true,
    }).select("-password");
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    const email=student.email;
    // Example: Send an HTML email
    const htmlContent = `
    <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Profile Update Notification</title>
  <style>
    /* General Styles */
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

    /* Animation */
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
      <h1>Rasiklal M. Dhariwal Institute of Technology</h1>
    </div>

    <!-- Content -->
    <div class="content">
      <h2>Profile Updated Successfully!</h2>
      <p>Dear Student,</p>
      <p>Your profile has been successfully updated in the <strong>ERP System</strong> of Rasiklal M. Dhariwal Institute of Technology, Chinchwad.</p>
      <p>If you did not make these changes or have any concerns, please contact the administration immediately.</p>
      <a href="https://your-erp-system-link.com" class="cta-button">Login to ERP System</a>
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
    
    sendMail(email, 'Student Profile Updated', '', htmlContent)
    .then(() => console.log('HTML email sent successfully!'))
    .catch((error) => console.error('Failed to send HTML email:', error));
    
    res.json(student);
  } catch (error) {
    console.error("Error updating student profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};



// Fetch the most recent notice
const getRecentNotice = async (req, res) => {
  try {
    // Find the most recent notice where `to` is either 'students' or 'all'
    const notice = await Notice.findOne({ to: { $in: ['students', 'all','faculties'] } }).sort({ date: -1 });

    if (!notice) {
      return res.status(404).json({ message: "No notices found" });
    }

    res.json(notice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch the most recent event
const getRecentEvent = async (req, res) => {
  try {
      const event = await Event.findOne().sort({ date: -1 });
      if (!event) {
          return res.status(404).json({ message: "No events found" });
      }
      res.json(event);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};


// Fetch timetable for student
const getTimetableForStudent = async (req, res) => {
  try {
    // Get student details
    const student = await Student.findById(req.user.id);
    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }

    // Find timetable matching student's department, year, and class
    const timetable = await Timetable.findOne({
      option:"timetable",
      department: student.department,
      year: student.year,
      classNumber: student.class1,
    });

    if (!timetable) {
      return res.status(404).json({ success: false, message: "Timetable not found" });
    }

    res.json({ success: true, timetable });
  } catch (error) {
    console.error("Error fetching timetable:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


// Fetch timetable for student
const getAcademicsCalender = async (req, res) => {
  try {
    // Get student details
    const student = await Student.findById(req.user.id);
    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }

    // Find timetable matching student's department, year, and class
    const calendar = await Timetable.findOne({
      option:"academic-calendar",
      department: student.department,
      year: student.year,
      classNumber: student.class1,
    });

    if (!calendar) {
      return res.status(404).json({ success: false, message: "Timetable not found" });
    }

    res.json({ success: true, calendar });
  } catch (error) {
    console.error("Error fetching timetable:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


// Fetch all notices for students
const getNoticesForStudents = async (req, res) => {
  try {
    // Fetch all notices (you can add filters if needed)
    const notices = await Notice.find().sort({ date: -1 }); // Sort by date in descending order

    if (!notices || notices.length === 0) {
      return res.status(404).json({ success: false, message: "No notices found" });
    }

    res.json({ success: true, notices });
  } catch (error) {
    console.error("Error fetching notices:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Fetch all events
const getEvents = async (req, res) => {
  try {
    // Fetch all events sorted by date
    const events = await Event.find().sort({ date: 1 }); // Sort by date in ascending order

    if (!events || events.length === 0) {
      return res.status(404).json({ success: false, message: "No events found" });
    }

    res.json({ success: true, events });
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};



// Fetch all tests assigned to a student (filtered by department, class, and year)
const getStudentTests = async (req, res) => {
  try {
    const { id: studentId } = req.user; // Assuming student ID is available in req.user

    // Fetch student details
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }

    // Fetch all tests matching the student's department, class, and year
    const tests = await Test.find({
      department: student.department,
      class: student.class1,
      year: student.year,
    });

    // Fetch test results for the student
    const testResults = await TestResult.find({ studentId });

    // Map tests to include marks if available
    const results = tests.map((test) => {
      const result = testResults.find((tr) => tr.testId.toString() === test._id.toString());
      return {
        testId: test._id,
        testTitle: test.testTitle,
        totalMarks: test.totalMarks,
        subject: test.subject,
        year: test.year,
        class: test.class,
        department: test.department,
        marksObtained: result ? result.marksObtained : null,
        resultDeclared: !!result, // Flag to check if result is declared
      };
    });

    res.status(200).json({ success: true, data: results });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// Fetch fee structure for a student based on department and year
const getFeeStructure = async (req, res) => {
  try {
    const { id: studentId } = req.user; // Assuming student ID is available in req.user

    // Fetch student details
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }

    // Fetch fee structure based on student's department and year
    const feeStructure = await FeeStructure.findOne({
      department: student.department,
      year: student.year,
    });

    if (!feeStructure) {
      return res.status(404).json({ success: false, message: "Fee structure not found" });
    }

    res.status(200).json({ success: true, data: feeStructure });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



// Get all faculties based on the student's department
const getFacultiesByStudentDepartment = async (req, res) => {
  try {
    const { id: studentId } = req.user; // Assuming student ID is available in req.user

    // Fetch student details
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }

    // Fetch faculties based on the student's department
    const faculties = await Faculty.find({ department: student.department });

    if (faculties.length === 0) {
      return res.status(404).json({ success: false, message: "No faculties found for this department" });
    }

    res.status(200).json({ success: true, data: faculties });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



// Get all subjects for a student based on department and semester
const getStudentSubjects = async (req, res) => {
  try {
    const student = await Student.findById(req.user.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const classrooms = await Classroom.find({
      department: student.department,
      semester: student.semester,
    });

    // Extract unique subjects
    const subjects = [...new Set(classrooms.map((cls) => cls.subject))];

    res.status(200).json(subjects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get classroom details for a specific subject
const getClassroomBySubject = async (req, res) => {
  try {
    const student = await Student.findById(req.user.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const classroom = await Classroom.findOne({
      department: student.department,
      semester: student.semester,
      subject: req.params.subject,
    });

    if (!classroom) {
      return res.status(404).json({ message: 'Classroom not found' });
    }

    res.status(200).json(classroom);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Get student's attendance
const getStudentAttendance = async (req, res) => {
  try {
    const studentId = req.user.id; // Assuming student ID is available in req.user.id

    // Find the student's semester and department
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const { semester, department } = student;

    // Find all subjects for the student's semester and department
    const subjects = await Subject.find({ semester, department });
    const subjectIds = subjects.map(subject => subject._id);

    // Find attendance records for the student
    const attendanceRecords = await Attendance.find({
      subject: { $in: subjectIds },
      totalStudents: studentId,
    }).populate('subject').populate('faculty');

    // Calculate attendance for each subject
    const attendanceData = subjects.map(subject => {
      const subjectAttendance = attendanceRecords.filter(record =>
        record.subject._id.equals(subject._id)
      );

      const totalLectures = subjectAttendance.length;
      const presentLectures = subjectAttendance.filter(record =>
        record.presentStudents.includes(studentId)
      ).length;

      const percentage = totalLectures > 0 ? ((presentLectures / totalLectures) * 100).toFixed(2) : 0;

      // Get faculty name from the first attendance record (assuming it's consistent)
      const facultyName = subjectAttendance.length > 0 ? subjectAttendance[0].faculty.userName : 'Unknown';

      return {
        subject: subject.subjectName,
        facultyName,
        totalLectures,
        presentLectures,
        percentage,
      };
    });

    res.status(200).json({ attendanceData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports={
    getStudentProfile,
    updateStudentProfile,
    getRecentNotice,
    getRecentEvent,
    getTimetableForStudent,
    getAcademicsCalender,
    getNoticesForStudents,
    getEvents,
    getStudentTests,
    getFeeStructure,
    getFacultiesByStudentDepartment,
    getStudentSubjects,
    getClassroomBySubject,
    getStudentAttendance

}