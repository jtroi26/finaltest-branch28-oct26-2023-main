const express = require('express');
const router = express.Router();
const studentIndexGrades = require('../controller/student-index-grades'); // Import the controller

/* GET home page. */
router.get('/student/index/grades', studentIndexGrades.getGradeIndexPage); // Use the controller for the route

module.exports = router;