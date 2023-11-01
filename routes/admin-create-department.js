var express = require('express');
var router = express.Router();
const adminCreateDepartment = require('../controller/admin-create-department'); // Import the controller
/* GET admin-create-deparment page. */
router.get('/admin/create-department', adminCreateDepartment.getCreateDepartmentPage);
router.post('/admin/create-department', adminCreateDepartment.postCreateDepartmentPage);


module.exports = router;
