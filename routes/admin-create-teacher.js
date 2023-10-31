var express = require('express');
var router = express.Router();
const adminCreateTeacher = require('../controller/admin-create-teacher'); // Import the controller
/* GET admin-dashboard page. */
router.get('/admin/create-teacher',adminCreateTeacher.getTeacherCreatePage);


module.exports = router;
