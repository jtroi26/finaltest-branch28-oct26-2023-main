const express = require('express');
const router = express.Router();
const teacherViewSubject = require('../controller/teacher-view-subject'); // Import the controller

/* GET home page. */
router.get('/teacher/view-subject/:id', teacherViewSubject.getSubjectPage); // Use the controller for the route
module.exports = router;