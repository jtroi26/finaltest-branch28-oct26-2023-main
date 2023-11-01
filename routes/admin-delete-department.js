var express = require('express');
var router = express.Router();
const adminDeleteDepartment = require('../controller/admin-delete-department'); // Import the controller
/* post delete subject. */
router.post('/admin/delete-department/:id',adminDeleteDepartment.postSetVisibility);

module.exports = router;