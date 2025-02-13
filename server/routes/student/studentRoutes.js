const express = require("express");
const { authMiddleware } = require("../../controllers/auth/auth-controller");
const { getStudentProfile, updateStudentProfile, getRecentEvent, getRecentNotice, getTimetableForStudent, getAcademicsCalender, getNoticesForStudents, getEvents, getStudentTests, getFeeStructure, getFacultiesByStudentDepartment } = require("../../controllers/student/studentController");
const router = express.Router();


// Protected routes
router.get("/profile", authMiddleware, getStudentProfile);
router.put("/profile", authMiddleware, updateStudentProfile);

// Route to get the most recent notice
router.get('/notices/recent', getRecentNotice);

// Route to get the most recent event
router.get('/events/recent', getRecentEvent);

// Fetch timetable for student
router.get("/timetable", authMiddleware, getTimetableForStudent);
router.get("/academic", authMiddleware, getAcademicsCalender);

// Fetch notices for students
router.get("/notices", authMiddleware, getNoticesForStudents);
// Get all tests for a student (filtered by department, class, and year)
router.get("/student-tests", authMiddleware, getStudentTests);
// Fetch all events
router.get("/events", getEvents);

// Get fee structure for a student
router.get("/fee-structure", authMiddleware, getFeeStructure);


// Get all faculties based on the student's department
router.get("/faculties", authMiddleware, getFacultiesByStudentDepartment);

module.exports = router;

// /api/student/
