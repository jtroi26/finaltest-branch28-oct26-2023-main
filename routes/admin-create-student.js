const express = require('express');
const router = express.Router();
const adminCreateStudent = require('../controller/admin-create-student'); // Import the controller
const multer = require('multer'); // Import multer
const path = require('path');

// Define the storage destination and filename
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './uploads');
    },
    filename: (req, file, callback) => {
        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage }); // Create the upload middleware

// Display the create student form
router.get('/admin/create/student', adminCreateStudent.getCreateStudent);

// Handle CSV file upload
router.post('/upload', upload.single('csvfile'), adminCreateStudent.postCreateStudent);

module.exports = router;
