var express = require('express');
var router = express.Router();
const teacherDeleteAnnouncement = require('../controller/teacher-delete-announcement'); // Import the controller
/* post delete subject. */
router.post('/teacher/announcement/delete/:id',teacherDeleteAnnouncement.postSetVisibility);

module.exports = router;