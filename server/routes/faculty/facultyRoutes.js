const express = require("express");
const { authMiddleware } = require("../../controllers/auth/auth-controller");
const {
  getAllDepartments,
  getAllDeptSubjects,
  getAllStudentsForAtt,
  markAttendance,
  getAttendance,
  updateAttendance,
  getFacultyProfile,
  updateFacultyProfile,
  uploadNotes,
  getAllNotes,
  getAllSubjects,
  getStudents,
  uploadTimetable,
  getTimetable,
  createNotice,
  getAllNotices,
  updateNotice,
  deleteNotice,
  getFacultyNotices,
  DashboardCount,
  getFeeStructures,
  uploadFeeStructure,
  createTest,
  uploadTestResult,
  deptSub,
  getTests,
  fetchStudentsForTest,
} = require("../../controllers/faculty/facultyController");
const router = express.Router();
const upload = require("../../utils/multerConfig");

router.get("/departments", getAllDepartments);
router.get("/dept-subjects/:department", getAllDeptSubjects);
router.post("/fetch-students-filter", getAllStudentsForAtt);
router.post("/mark-attendance", markAttendance);
router.post("/get-attendance", getAttendance);
router.post("/update-attendance", updateAttendance);
router.get("/profile", authMiddleware, getFacultyProfile);
router.put("/profile", authMiddleware, updateFacultyProfile);

// Upload Notes Route
router.post(
  "/upload",
  authMiddleware, // Ensure the user is authenticated
  upload.single("file"), // Handle single file upload
  uploadNotes
);

router.get("/notes", authMiddleware, getAllNotes);
router.get("/get-all-subjects", getAllSubjects);
router.post("/get-students",authMiddleware, getStudents);

// Upload Timetable Route
router.post(
  "/upload-timetable",
  authMiddleware, // Ensure the user is authenticated
  upload.single("file"), // Handle single file upload
  uploadTimetable
);

// Get Timetable Route
router.get("/get-timetable", authMiddleware, getTimetable);



// Create a new notice
router.post("/notices", createNotice);

// Get all notices
router.get("/notices", getAllNotices);
router.get("/fac-notices", getFacultyNotices);

// Update a notice by ID
router.put("/notices/:id", updateNotice);

// Delete a notice by ID
router.delete("/notices/:id", deleteNotice);

router.get("/dashboard/counts", DashboardCount);

// Protected routes
router.post("/upload-fees", authMiddleware, upload.single("file"), uploadFeeStructure);
router.get("/get-fees", authMiddleware, getFeeStructures);




// Protected routes
router.post("/create-test", authMiddleware, createTest);
router.get("/get-dept-sub",authMiddleware, deptSub);
router.get("/get-tests",authMiddleware, getTests);
router.get("/students-for-test/:testId", authMiddleware, fetchStudentsForTest);
router.post("/upload-test-result", authMiddleware, uploadTestResult);






module.exports = router;

// /api/faculty/dashboard/counts
