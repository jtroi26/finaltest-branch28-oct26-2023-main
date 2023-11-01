var express = require('express');
var router = express.Router();
const adminIndexTeacher = require('../controller/admin-index-teacher'); // Import the controller
/* GET admin-index-teacher page. */
router.get('/admin/index-teacher',adminIndexTeacher.getIndexTeacherPage);

module.exports = router;