const express = require('express');
const router = express.Router();
const teacherEditAttendance = require('../controller/teacher-edit-attendance'); // Import the controller

/* GET home page. */
router.get('/teacher/students/attendance/edit/:id', teacherEditAttendance.getEditAttendancePage); // Use the controller for the route
router.post('/teacher/students/attendance/edit/:id', teacherEditAttendance.postEditAttendance); // Use the controller for the route
module.exports = router;