const express = require('express');
const router = express.Router();
const teacherEditLessonController = require('../controller/teacher-edit-lesson'); // Import the controller

/* GET home page. */
router.get('/teacher/lesson/edit-lesson/:id', teacherEditLessonController.getEditLesson); // Use the controller for the route
router.post('/teacher/lesson/edit-lesson/:id', teacherEditLessonController.postEditLesson); // Use the controller for the route
module.exports = router;