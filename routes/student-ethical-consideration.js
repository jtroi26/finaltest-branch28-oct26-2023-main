var express = require('express');
var router = express.Router();
const ethicalConsideration = require('../controller/student-ethical-consideration'); // Import the controller
/* GET admin-index-teacher page. */
router.get('/student/ethical-consideration',ethicalConsideration.getIndexPage);

module.exports = router;