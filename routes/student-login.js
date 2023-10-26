const express = require('express');
const router = express.Router();
const studentLoginController = require('../controller/student-login'); // Import the controller

/* GET home page. */
router.get('/', studentLoginController.getLoginPage); // Use the controller for the route
router.post('/student/login',studentLoginController.postStudentLogin);
module.exports = router;
