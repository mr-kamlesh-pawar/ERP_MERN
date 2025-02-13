const Event = require("../../models/Event");
const Notice = require("../../models/Notice");
const Student = require("../../models/Student");
const Timetable = require("../../models/Timetable");
const TestResult = require("../../models/Marks");
const Test = require("../../models/Test");
const FeeStructure = require("../../models/FeeStructure");
const Faculty = require("../../models/Faculty");

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
    res.json(student);
  } catch (error) {
    console.error("Error updating student profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};



// Fetch the most recent notice
const getRecentNotice = async (req, res) => {
  try {
      const notice = await Notice.findOne().sort({ date: -1 });
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
    getFacultiesByStudentDepartment

}