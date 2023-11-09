const express = require('express');
const router = express.Router();
const teacherIndexAttendanceController = require('../controller/teacher-create-attendance'); // Import the controller

/* GET announcement page. */
router.get('/teacher/create/attendance', teacherIndexAttendanceController.getAttendancePage); // Use the controller for the route
router.post('/teacher/create/attendance', teacherIndexAttendanceController.postAttendancePage);
module.exports = router;