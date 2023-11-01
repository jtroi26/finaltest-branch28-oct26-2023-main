var express = require('express');
var router = express.Router();
const adminIndexDepartment = require('../controller/admin-index-department'); // Import the controller
/* GET admin-index-department page. */
router.get('/admin/index-department',adminIndexDepartment.getIndexDepartment);

module.exports = router;