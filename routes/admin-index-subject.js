var express = require('express');
var router = express.Router();
const adminIndexSubject = require('../controller/admin-index-subject'); // Import the controller
/* GET admin-dashboard page. */
router.get('/admin/index-subject',adminIndexSubject.getSubjectIndexPage);
// router.post('/admin/create-subject', adminCreateSubject.postSubjectCreatePage);


module.exports = router;