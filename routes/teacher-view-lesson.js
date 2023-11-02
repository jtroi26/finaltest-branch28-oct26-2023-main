const express = require('express');
const router = express.Router();
const teacherViewLesson = require('../controller/teacher-view-lesson'); // Import the controller

/* GET home page. */
router.get('/teacher/lesson/view-lesson/:id', teacherViewLesson.getLessonPageView); // Use the controller for the route
module.exports = router;