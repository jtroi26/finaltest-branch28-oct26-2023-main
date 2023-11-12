const express = require('express');
const router = express.Router();
const teacherIndexGrades = require('../controller/teacher-index-grades'); // Import the controller

/* GET home page. */
router.get('/teacher/index/grades', teacherIndexGrades.getIndexPage); // Use the controller for the route

module.exports = router;