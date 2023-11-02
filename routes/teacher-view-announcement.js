const express = require('express');
const router = express.Router();
const teacherViewAnnouncement = require('../controller/teacher-view-announcement'); // Import the controller

/* GET home page. */
router.get('/teacher/announcement/view/:id', teacherViewAnnouncement.getAnnouncementPageView); // Use the controller for the route
module.exports = router;