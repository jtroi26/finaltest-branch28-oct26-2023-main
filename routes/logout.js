var express = require('express');
const router = express.Router();
const logoutController = require('../controller/logout');

router.get('/logout', logoutController.getlogout );
router.post('/logout', logoutController.postlogout );
router.post('/admin-logout', logoutController.postadminlogout);
router.post('/teacher-logout', logoutController.postteacherlogout);

module.exports = router;