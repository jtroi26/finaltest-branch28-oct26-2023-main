var express = require('express');
var router = express.Router();
const adminIndexSection = require('../controller/admin-index-section'); // Import the controller
/* GET admin-index-section page. */
router.get('/admin/index-section',adminIndexSection.getIndexSection);



module.exports = router;