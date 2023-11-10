var express = require('express');
var router = express.Router();
const adminIndexStudents = require('../controller/admin-index-student'); // Import the controller
/* GET admin-index-section page. */
router.get('/admin/index-student',adminIndexStudents.getIndexStudents);

module.exports = router;