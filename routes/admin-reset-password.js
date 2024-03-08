var express = require('express');
var router = express.Router();
const adminResetPassword = require('../controller/admin-reset-password'); // Import the controller
/* GET admin-create page. */
router.get('/admin/reset-password', adminResetPassword.getResetPasswordPage);
router.post('/admin/reset-student-password', adminResetPassword.postStudentResetPassword);
router.post('/admin/reset-teacher-password', adminResetPassword.postTeacherResetPassword);


module.exports = router;
