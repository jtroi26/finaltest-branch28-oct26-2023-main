const express = require('express');
const router = express.Router();
const teacherCreateGrades = require('../controller/teacher-create-grades'); // Import the controller

/* GET announcement page. */
router.get('/teacher/create/grades', teacherCreateGrades.getGradesPage); // Use the controller for the route
router.post('/teacher/create/grades', teacherCreateGrades.postGradesPage);
module.exports = router;