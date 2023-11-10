const express = require('express');
const router = express.Router();
const teacherEditGradeController = require('../controller/teacher-edit-grade'); // Import the controller

/* GET home page. */
router.get('/teacher/grades/update/:id', teacherEditGradeController.getEditGrade); // Use the controller for the route
router.post('/teacher/grades/update/:id', teacherEditGradeController.postEditGrade); // Use the controller for the route
module.exports = router;