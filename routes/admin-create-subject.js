var express = require('express');
var router = express.Router();
const adminCreateSubject = require('../controller/admin-create-subject'); // Import the controller
/* GET admin-dashboard page. */
router.get('/admin/create-subject',adminCreateSubject.getSubjectCreatePage);
router.post('/admin/create-subject', adminCreateSubject.postSubjectCreatePage);


module.exports = router;
