var express = require('express');
var router = express.Router();
const announcementIndexPage = require('../controller/student-index-announcements'); // Import the controller
/* GET admin-index-teacher page. */
router.get('/student/announcements',announcementIndexPage.getAnnouncementIndexPage);

module.exports = router;