var express = require('express');
const router = express.Router();
const logoutController = require('../controller/logout');

router.get('/logout', logoutController.getlogout );
router.post('/logout', logoutController.postlogout );

module.exports = router;