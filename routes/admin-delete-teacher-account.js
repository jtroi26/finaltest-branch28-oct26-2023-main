var express = require('express');
var router = express.Router();
const adminDeleteTeacher = require('../controller/admin-delete-teacher-account'); // Import the controller
/* post delete subject. */
router.post('/admin/delete/teacher-account/:id',adminDeleteTeacher.postSetVisibility);

module.exports = router;