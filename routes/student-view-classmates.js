const express = require('express');
const router = express.Router();
const studentClassmates = require('../controller/student-view-classmates'); // Import the controller

/* GET home page. */
router.get('/student/view/classmates/', studentClassmates.getClassmatesPage); // Use the controller for the route

module.exports = router;