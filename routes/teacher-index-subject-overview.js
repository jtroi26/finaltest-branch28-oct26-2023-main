const express = require('express');
const router = express.Router();
const subjectoverview = require('../controller/teacher-index-subject-overview'); // Import the controller

/* GET home page. */
router.get('/teacher/subjectoverview', subjectoverview.getIndexPage); // Use the controller for the route

module.exports = router;