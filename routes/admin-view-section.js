var express = require('express');
var router = express.Router();
const adminViewSection = require('../controller/admin-view-section'); // Import the controller
/* GET view-section/:id page. */
router.get('/admin/view-section/:id',adminViewSection.getViewSection);

module.exports = router;
