var express = require('express');
var router = express.Router();
const adminEditStudent = require('../controller/admin-edit-student'); // Import the controller
/* GET admin-dashboard page. */
router.get('/admin/edit/student/:id',adminEditStudent.getEditStudent);
router.post('/admin/edit/student/:id', adminEditStudent.postEditStudent);


module.exports = router;