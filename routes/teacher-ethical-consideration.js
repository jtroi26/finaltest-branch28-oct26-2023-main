var express = require('express');
var router = express.Router();
const ethicalConsiderationTeacher = require('../controller/teacher-ethical-consideration'); // Import the controller
/* GET admin-index-teacher page. */
router.get('/teacher/ethical-consideration',ethicalConsiderationTeacher.getIndexPage);

module.exports = router;