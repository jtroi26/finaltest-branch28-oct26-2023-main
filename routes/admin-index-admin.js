var express = require('express');
var router = express.Router();
const adminIndexAdmin = require('../controller/admin-index-admin'); // Import the controller
/* GET admin-index-department page. */
router.get('/admin-index-admin',adminIndexAdmin.getIndexAdmin);
router.post('/create-admin-account', adminIndexAdmin.postAdminAccount);
router.get('/view-admin-account', adminIndexAdmin.getViewAdmin);
router.get('/edit-admin-account/:id', adminIndexAdmin.getEditAdmin);
router.post('/edit-admin-account/:id', adminIndexAdmin.postEditAdmin);

module.exports = router;