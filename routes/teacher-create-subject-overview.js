const express = require('express');
const router = express.Router();
const subjectOverview = require('../controller/teacher-create-subject-overview'); // Import the controller

/* GET create lesson page. */
router.get('/teacher/subjectoverview/create', subjectOverview.getSubjectOverviewForm); // Use the controller for the route
router.post('/teacher/subjectoverview/create', subjectOverview.postSubjectOverviewForm);
module.exports = router;