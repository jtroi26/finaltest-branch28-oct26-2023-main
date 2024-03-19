var express = require('express');
var router = express.Router();
const multer = require('multer'); // Import Multer
const teacherfileuploadsrouter = require('../controller/teacher-file-uploads');

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

/* GET home page. */
router.get('/file_uploads', teacherfileuploadsrouter.getfileuploads);

// Handle file upload using Multer middleware before the route handler
router.post('/file_uploads', upload.single('file'), teacherfileuploadsrouter.uploadFile);

router.get('/download/:filename', teacherfileuploadsrouter.download);
router.get('/edit/:id', teacherfileuploadsrouter.getedit);
router.post('/edit/:id', teacherfileuploadsrouter.postedit);
//delete file
// router.post('/delete/:id', teacherfileuploadsrouter.postSetInvisibility);

module.exports = router;