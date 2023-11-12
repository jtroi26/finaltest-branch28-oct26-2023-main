var express = require('express');
const router = express.Router();
const openaichatbotController = require('../controller/openaichatbot');

router.get('/openaichatbot', openaichatbotController.getopenaichatbot );


module.exports = router;