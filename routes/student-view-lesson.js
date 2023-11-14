const express = require('express');
const router = express.Router();
const studentViewLesson = require('../controller/student-view-lesson'); // Import the controller

/* GET home page. */
router.get('/student/view/lesson/:id', studentViewLesson.getLessonPage); // Use the controller for the route
router.post('/student/view/lesson/:id', studentViewLesson.postOpenAI);
module.exports = router;
