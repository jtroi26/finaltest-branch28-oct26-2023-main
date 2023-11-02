const express = require('express');
const router = express.Router();
const teacherCreateLesson = require('../controller/teacher-create-lesson'); // Import the controller

/* GET create lesson page. */
router.get('/teacher/lesson/create', teacherCreateLesson.getLessonCreatePage); // Use the controller for the route
router.post('/teacher/lesson/create', teacherCreateLesson.postLessonCreatePage);
module.exports = router;