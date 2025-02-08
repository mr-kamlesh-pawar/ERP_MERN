const express = require("express");
const { authMiddleware } = require("../../controllers/auth/auth-controller");
const { getAllDepartments, getAllDeptSubjects, getAllStudentsForAtt, markAttendance, getAttendance, updateAttendance, getFacultyProfile, updateFacultyProfile, uploadNotes,  getAllNotes, getAllSubjects } = require("../../controllers/faculty/facultyController");
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


module.exports = router;

// /api/faculty/get-all-subjects
