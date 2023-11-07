const express = require('express');
const router = express.Router();
const teacherIndexAttendanceController = require('../controller/teacher-index-attendance'); // Import the controller

/* GET home page. */
router.get('/teacher/students/attendance/', teacherIndexAttendanceController.getAttendanceIndexPage); // Use the controller for the route

module.exports = router;