var express = require('express');
var router = express.Router();
const adminDeleteSubject = require('../controller/admin-delete-subject'); // Import the controller
/* post delete subject. */
router.post('/admin/delete-subject/:id',adminDeleteSubject.postSetVisibility);

module.exports = router;