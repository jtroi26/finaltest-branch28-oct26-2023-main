var express = require('express');
var router = express.Router();
const adminView = require('../controller/admin-view-subject'); // Import the controller
/* GET view-subject/:id page. */
router.get('/admin/view-subject/:id',adminView.getSubjectView);


module.exports = router;
// router.post('/admin/login',adminLogin.postAdminLogin);