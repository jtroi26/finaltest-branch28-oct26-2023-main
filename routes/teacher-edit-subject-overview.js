const express = require('express');
const router = express.Router();
const teacherEditSubjectOverview = require('../controller/teacher-edit-subject-overview'); // Import the controller

/* GET home page. */
router.get('/teacher/subjectoverview/edit/:id', teacherEditSubjectOverview.getSubjectOverview); // Use the controller for the route
router.post('/teacher/subjectoverview/edit/:id', teacherEditSubjectOverview.postSubjectOverview); // Use the controller for the route
module.exports = router;