const express = require('express');
const router = express.Router();
const teacherAccountController = require('../controller/teacher-account'); // Import the controller

/* GET home page. */
router.get('/teacher/account', teacherAccountController.getteacherAccount); // Use the controller for the route
router.post('/teacher/change-password', teacherAccountController.postteacherChangePassword);

module.exports = router;
