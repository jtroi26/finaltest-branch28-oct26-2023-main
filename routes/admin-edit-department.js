var express = require('express');
var router = express.Router();
const adminEditDepartment = require('../controller/admin-edit-department'); // Import the controller
/* GET admin-edit-section page. */
router.get('/admin/edit-department/:id',adminEditDepartment.getEditDepartmentPage);
router.post('/admin/edit-department/:id',adminEditDepartment.postEditDepartmentPage);
module.exports = router;