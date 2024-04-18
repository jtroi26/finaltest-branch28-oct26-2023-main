const express = require('express');
const router = express.Router();
const adminAccountController = require('../controller/admin-account'); // Import the controller

/* GET home page. */
router.get('/admin/account', adminAccountController.getadminAccount); // Use the controller for the route
router.post('/admin/change-password', adminAccountController.postadminChangePassword);

module.exports = router;
