const express = require('express');
const router = express.Router();
const teacherDashboardController = require('../controller/teacher-dashboard'); // Import the controller

/* GET home page. */
router.get('/teacher/dashboard', teacherDashboardController.getTeacherDashboard); // Use the controller for the route

module.exports = router;
