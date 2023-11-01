var express = require('express');
var router = express.Router();
const adminEditTeacher = require('../controller/admin-edit-teacher-account'); // Import the controller
/* GET admin-dashboard page. */
router.get('/admin/edit/teacher-account/:id',adminEditTeacher.getEditTeacherAccountPage);
router.post('/admin/edit/teacher-account/:id', adminEditTeacher.postEditTeacherAccountPage);

module.exports = router;