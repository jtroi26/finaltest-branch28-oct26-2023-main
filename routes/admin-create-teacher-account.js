var express = require('express');
var router = express.Router();
const adminCreateTeacher = require('../controller/admin-create-teacher-account'); // Import the controller
/* GET admin-dashboard page. */
router.get('/admin/create-teacher-account',adminCreateTeacher.getTeacherCreatePage);
router.post('/admin/create-teacher-account',adminCreateTeacher.postTeacherCreateAccount)


module.exports = router;
 