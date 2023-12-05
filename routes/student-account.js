const express = require('express');
const router = express.Router();
const studentAccountController = require('../controller/student-account'); // Import the controller

/* GET home page. */
router.get('/student/account', studentAccountController.getstudentAccount); // Use the controller for the route
router.post('/student/change-password', studentAccountController.postChangePassword);

module.exports = router;
