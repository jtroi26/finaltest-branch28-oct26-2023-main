const express = require('express');
const router = express.Router();
const teacherIndexAttendanceController = require('../controller/teacher-index-attendance'); // Import the controller

/* GET announcement page. */
router.get('/teacher/index/attendance', teacherIndexAttendanceController.getAttendancePage); // Use the controller for the route

module.exports = router;