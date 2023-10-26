const express = require('express');
const router = express.Router();
const studentDashboardController = require('../controller/student-dashboard'); // Import the controller

/* GET home page. */
router.get('/student/dashboard', studentDashboardController.getStudentDashboard); // Use the controller for the route

module.exports = router;
