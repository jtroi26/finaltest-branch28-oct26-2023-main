const express = require('express');
const router = express.Router();
const teacherEditAnnouncementController = require('../controller/teacher-edit-announcement'); // Import the controller

/* GET home page. */
router.get('/teacher/announcement/edit/:id', teacherEditAnnouncementController.getEditAnnouncementForm); // Use the controller for the route
router.post('/teacher/announcement/edit/:id', teacherEditAnnouncementController.postEditAnnouncementForm); // Use the controller for the route

module.exports = router;