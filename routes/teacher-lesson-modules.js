const express = require('express');
const router = express.Router();
const teacherlessonmodulesController = require('../controller/teacher-lesson-modules'); // Import the controller

/* GET home page. */
router.get('/teacher/lesson/modules', teacherlessonmodulesController.getSubjectModules); // Use the controller for the route

module.exports = router;