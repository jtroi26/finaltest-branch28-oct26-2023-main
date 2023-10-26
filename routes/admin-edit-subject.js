var express = require('express');
var router = express.Router();
const adminEditSubject = require('../controller/admin-edit-subject'); // Import the controller
/* GET admin-dashboard page. */
router.get('/admin/edit-subject/:id',adminEditSubject.getEditSubjectPage);
router.post('/admin/edit-subject/:id', adminEditSubject.postEditSubjectPage);


module.exports = router;