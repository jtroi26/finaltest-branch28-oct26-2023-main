const express = require('express');
const router = express.Router();
const announcement = require('../controller/student-view-announcement'); // Import the controller

/* GET home page. */
router.get('/student/view/announcement/', announcement.getAnnouncementPage); // Use the controller for the route

module.exports = router;