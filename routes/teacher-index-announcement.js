const express = require('express');
const router = express.Router();
const teacherIndexAnnouncementController = require('../controller/teacher-index-announcement'); // Import the controller

/* GET announcement page. */
router.get('/teacher/announcement/', teacherIndexAnnouncementController.getAnnouncementIndexPage); // Use the controller for the route

module.exports = router;