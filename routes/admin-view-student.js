var express = require('express');
var router = express.Router();
const adminViewStudent = require('../controller/admin-view-student'); // Import the controller
/* GET view/student/:id page. */
router.get('/admin/view/student/:id',adminViewStudent.getViewStudent);

module.exports = router;
