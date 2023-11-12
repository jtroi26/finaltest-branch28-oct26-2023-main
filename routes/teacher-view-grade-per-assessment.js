const express = require('express');
const router = express.Router();
const teacherViewGrade = require('../controller/teacher-view-grade-per-assessment'); // Import the controller

/* GET home page. */
router.get('/teacher/view/grades/:id', teacherViewGrade.getAssessmentGrades); // Use the controller for the route
module.exports = router;