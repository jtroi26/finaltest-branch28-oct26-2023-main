const express = require('express');
const router = express.Router();
const teacherViewStudents = require('../controller/teacher-view-students'); // Import the controller

/* GET home page. */
router.get('/teacher/view/students', teacherViewStudents.getStudentsPageView); // Use the controller for the route
module.exports = router;