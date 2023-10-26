var express = require('express');
var router = express.Router();
const adminDashboard = require('../controller/admin-dashboard'); // Import the controller
/* GET admin-dashboard page. */
router.get('/admin/dashboard',adminDashboard.getDashboard);


module.exports = router;
