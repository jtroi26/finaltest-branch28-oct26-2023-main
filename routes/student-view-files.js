var express = require('express');
var router = express.Router();
const multer = require('multer'); // Import Multer
const studentviewfilesrouter = require('../controller/student-view-files');

// Define Multer storage and setup
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'file_uploads'); // Set your upload directory here
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

//routes
router.get('/view-files', studentviewfilesrouter.getviewfiles);
router.post('/download/:filename', studentviewfilesrouter.poststudentfiledownload);

module.exports = router;