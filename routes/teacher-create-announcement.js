const express = require('express');
const router = express.Router();
const teacherCreateAnnouncement = require('../controller/teacher-create-announcement'); // Import the controller

/* GET create lesson page. */
router.get('/teacher/announcement/create', teacherCreateAnnouncement.getCreateAnnouncementPage); // Use the controller for the route
router.post('/teacher/announcement/create', teacherCreateAnnouncement.postCreateAnnouncementPage);
module.exports = router;