var express = require('express');
var router = express.Router();
const studentViewSubject = require('../controller/student-view-subject'); // Import the controller
/* GET student/view/subject/:id page. */
router.get('/student/view/subject/:id',studentViewSubject.getSubjectView);

module.exports = router;
