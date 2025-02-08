const express = require("express");
const {
  updateAdminProfile,
  getAdminProfile,
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
} = require("../../controllers/admin/adminController");
const { authMiddleware } = require("../../controllers/auth/auth-controller");
const router = express.Router();

// Fetch Admin Profile (GET)
router.get("/profile", authMiddleware, getAdminProfile);

// Update Admin Profile (PUT)
router.put("/profile", authMiddleware, updateAdminProfile);

// Create a new notice
router.post("/notices", createNotice);

// Get all notices
router.get("/notices", getAllNotices);

// Get a single notice by ID
router.get("/notices/:id", getNoticeById);

// Update a notice by ID
router.put("/notices/:id", updateNotice);

// Delete a notice by ID
router.delete("/notices/:id", deleteNotice);

// Create a new admin
router.post("/admins", createAdmin);

// Get all admins
router.get("/admins", getAllAdmins);

// Get a single admin by ID
router.get("/admins/:id", getAdminById);

// Update an admin by ID
router.put("/admins/:id", updateAdmin);

// Delete an admin by ID
router.delete("/admins/:id", deleteAdmin);

// Create a new department
router.post("/departments", createDepartment);

// Get all departments
router.get("/departments", getAllDepartments);

// Get a single department by ID
router.get("/departments/:id", getDepartmentById);

// Update a department by ID
router.put("/departments/:id", updateDepartment);

// Delete a department by ID
router.delete("/departments/:id", deleteDepartment);

// Routes for Faculty
router.post("/faculty", createFaculty); // Create Faculty
router.put("/faculty/:id", updateFaculty); // Update Faculty
router.delete("/faculty/:id", deleteFaculty); // Delete Faculty
router.get("/faculties", getAllFaculties); // Get all Faculties

// Create a new subject
router.post("/subjects", createSubject);

// Get all subjects
router.get("/subjects", getAllSubjects);

// Delete a subject by ID
router.delete("/subjects/:id", deleteSubject);

router.get("/events", getEvents);
router.post("/events", createEvent);
router.put("/events/:id", updateEvent);
router.delete("/events/:id", deleteEvent);

// Add a new student
router.post("/students", addStudent);

// Get all students
router.get("/students", getAllStudents);

// Search students by department and year
router.get("/students/search", searchStudents);

// Delete a student by ID
router.delete("/students/:id", deleteStudent);

module.exports = router;
