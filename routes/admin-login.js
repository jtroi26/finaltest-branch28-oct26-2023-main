var express = require('express');
var router = express.Router();
const adminLogin = require('../controller/admin-login'); // Import the controller
/* GET admin-login page. */
router.get('/admin/',adminLogin.getAdminLogin);
router.post('/admin/login',adminLogin.postAdminLogin);

module.exports = router;
