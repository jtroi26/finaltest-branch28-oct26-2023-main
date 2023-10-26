var express = require('express');
var router = express.Router();
const adminDeleteSection = require('../controller/admin-delete-section'); // Import the controller
/* post delete subject. */
router.post('/admin/delete-section/:id',adminDeleteSection.postSetVisibility);

module.exports = router;