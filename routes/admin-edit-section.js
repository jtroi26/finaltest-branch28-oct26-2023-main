var express = require('express');
var router = express.Router();
const adminEditSection = require('../controller/admin-edit-section'); // Import the controller
/* GET admin-edit-section page. */
router.get('/admin/edit-section/:id',adminEditSection.getEditSectionPage);
router.post('/admin/edit-section/:id', adminEditSection.postEditSectionPage);


module.exports = router;