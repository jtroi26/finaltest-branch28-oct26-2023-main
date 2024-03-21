const mysql = require('mysql2/promise');
const multer = require('multer');
require('dotenv').config();

const conn = {
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
};

const pool = mysql.createPool(conn);
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'file_uploads'); // Set your upload directory here
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

exports.getviewfiles = async (req, res) => {
    mysql.createConnection(conn);

    const sectionname = req.session.sectionname;
    const studentid = req.session.studentID;

    try {
        // const pool = mysql.createPool(conn);
        const connection = await pool.getConnection();
        
        // Fetch uploaded files
        const [fileRows] = await connection.query('SELECT * FROM uploaded_files WHERE sectionname = ?', [sectionname]);
        
        connection.release();

        res.render('student-view-files', { files: fileRows, studentid: studentid, sectionname });
    } catch (err) {
        console.error('Error fetching files and sections:', err);
        res.status(500).json({ error: 'Error fetching files and sections' });
    }

}

exports.poststudentfiledownload = async (req, res) => {
    try {
        const fileName = req.params.filename;
        // Retrieve the file path from the database based on the provided filename

        const connection = await pool.getConnection();
        const [rows] = await connection.query('SELECT path FROM uploaded_files WHERE filename = ?', [fileName]);
        connection.release();

        if (rows.length > 0) {
            const filePath = rows[0].path;
            // Trigger the download of the specified file
            res.download(filePath);
        } else {
            res.status(404).send('File not found');
        }
    } catch (err) {
        console.error('Error downloading file:', err);
        res.status(500).send('Error downloading file');
    }
}