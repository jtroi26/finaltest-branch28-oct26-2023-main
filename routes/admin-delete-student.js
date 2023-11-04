var express = require('express');
var router = express.Router();
const adminDeleteStudent = require('../controller/admin-delete-student'); // Import the controller
/* post delete subject. */
router.post('/admin/delete/student/:id',adminDeleteStudent.postSetStatus);

module.exports = router;