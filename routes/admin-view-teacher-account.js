var express = require('express');
var router = express.Router();
const adminViewTeacherAccount = require('../controller/admin-view-teacher-account'); // Import the controller
/* GET view-subject/:id page. */
router.get('/admin/view/teacher-account/:id',adminViewTeacherAccount.getTeacherAccountView);


module.exports = router;
// router.post('/admin/login',adminLogin.postAdminLogin);