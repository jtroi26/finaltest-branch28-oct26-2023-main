const mysql = require('mysql');
const fs = require('fs');
const fastCsv = require('fast-csv');
const multer = require('multer');
const path = require('path');

const conn = {
    host: 'localhost',
    database: 'finalcapstone',
    user: 'root',
    password: ''
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './uploads');
    },
    filename: (req, file, callback) => {
        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });

exports.getCreateStudent = (req, res) => {
    res.render('admin-create-student');
};

exports.postCreateStudent = (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded');
    }

    const filePath = req.file.path;

    const uploadCallback = () => {
        res.redirect('/admin/create/student');
    };

    uploadCsv(filePath, uploadCallback);
};

function uploadCsv(filePath, callback) {
    const stream = fs.createReadStream(filePath);
    const csvData = [];
    const fileStream = fastCsv.parse({ headers: true }).on('data', (data) => {
        csvData.push(data);
    }).on('end', () => {
        const connection = mysql.createPool(conn);
        const query = 'INSERT INTO students (studentID, firstname, middlename, lastname, suffix, sectionname) VALUES ?';
        const values = csvData.map((row) => [row.studentID, row.firstname, row.middlename, row.lastname, row.suffix, row.sectionname]);
        connection.query(query, [values], (error) => {
            connection.end(); // Close the connection
            if (error) {
                console.error(error);
            }
            callback();
        });
    });
    stream.pipe(fileStream);
}
