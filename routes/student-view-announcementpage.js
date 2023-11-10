const express = require('express');
const router = express.Router();
const studentAnnouncements = require('../controller/student-view-announcementpage'); // Import the controller

/* GET home page. */
router.get('/student/view/announcement/:id', studentAnnouncements.getAnnouncement); // Use the controller for the route

module.exports = router;