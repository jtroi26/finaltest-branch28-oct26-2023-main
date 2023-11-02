var express = require('express');
var router = express.Router();
const teacherDeleteLesson = require('../controller/teacher-delete-lesson'); // Import the controller
/* post delete subject. */
router.post('/teacher/lesson/delete-lesson/:id',teacherDeleteLesson.postSetVisibility);

module.exports = router;