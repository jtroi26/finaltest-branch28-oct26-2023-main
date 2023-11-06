var express = require('express');
var router = express.Router();
const studentViewLessons = require('../controller/student-view-lessons'); // Import the controller
/* GET student/view/lessons/:id page. */
router.get('/student/view/lessons/',studentViewLessons.getLessonsView);

module.exports = router;
