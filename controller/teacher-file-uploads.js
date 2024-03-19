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

exports.getfileuploads = async (req, res) => {

    const teacherid = req.session.teacherid;

    try {
        // const pool = mysql.createPool(conn);
        const connection = await pool.getConnection();
        
        // Fetch uploaded files
        const [fileRows] = await connection.query('SELECT * FROM uploaded_files WHERE teacherid = ?', [teacherid]);

        
        // Fetch sections
        const [sectionRows] = await connection.query(`SELECT * FROM sections
                                INNER JOIN subjects ON sections.sectionname = subjects.sectionname
                                INNER JOIN teacherdetails ON subjects.teacherid = teacherdetails.teacherid
                                WHERE subjects.teacherid = ?`, [teacherid]);

        connection.release();

        res.render('teacher-file-uploads', { files: fileRows, sections: sectionRows, teacherid }); // Pass the 'fileRows' and 'sectionRows' data to the 'teacher-file-uploads.ejs' template
    } catch (err) {
        console.error('Error fetching files and sections:', err);
        res.status(500).json({ error: 'Error fetching files and sections' });
    }
}


//file uploads
exports.uploadFile = async (req, res) => {

    const teacherid = req.session.teacherid;

    try {
        console.log(req.file);
        // Get file information from req.file
        const { filename, path, mimetype, size } = req.file;
        
        // Get sectionname from req.body
        const { sectionname, name_of_file, visibility } = req.body;

        // Insert file details into the database
        const pool = mysql.createPool(conn);
        const connection = await pool.getConnection();
        const [result] = await connection.query(
            'INSERT INTO uploaded_files (filename, sectionname, name_of_file, teacherid, path, mimetype, size, visibility) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [filename, sectionname, name_of_file, teacherid, path, mimetype, size, visibility]
        );
        connection.release();

        req.flash('success', 'You can proceed');
        res.redirect('/file_uploads');
    } catch (err) {
        console.error('Error uploading file:', err);
        res.status(500).json({ error: 'Error uploading file' });
    }
}


//file donnload
exports.download = async (req, res) => {
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

exports.getedit = async (req, res) => {

    const teacherid = req.session.teacherid;

        try {
        const id = req.params.id; // Assuming you have the file ID in the URL
        const pool = mysql.createPool(conn);
        const connection = await pool.getConnection();
        
        const sql = `SELECT sectionname, name_of_file, visibility FROM uploaded_files WHERE id=?`;

        connection.query(sql, [id], (error, results) => {
            if (error) {
                connection.release();
                console.error('Error fetching file details:', error);
                return res.status(500).json({ error: 'Error fetching file details' });
            }
            
            connection.release();

            if (results.length === 0) {
                return res.status(404).json({ error: 'File not found' });
            }

            res.render('teacher-file-uploads', { results: results[0], teacherid }); // Render the edit modal EJS template and pass file details
        });
    } catch (err) {
        console.error('Error fetching file details:', err);
        res.status(500).json({ error: 'Error fetching file details' });
    }
};

exports.postedit = async (req, res) => {
    try {
        const { id } = req.params;
        const { name_of_file, sectionname, visibility } = req.body;

        // Update the file attributes in the database
        const connection = await pool.getConnection();
        await connection.query(
            'UPDATE uploaded_files SET name_of_file = ?, sectionname = ?, visibility = ? WHERE id = ?',
            [name_of_file, sectionname, visibility, id]
        );
        connection.release();
        req.flash('success1', 'You can proceed');
        res.redirect('/file_uploads'); // Redirect to the main page or wherever appropriate
    } catch (err) {
        console.error('Error updating file attributes:', err);
        res.status(500).send('Error updating file attributes');
    }
};

// exports.postSetInvisibility = (req, res) => {
//     const connection = mysql.createConnection(conn);
//     const { id } = req.params; // Extract the ID from the URL parameter

//     const value = "Invisible";
    
//     const sql = `UPDATE uploaded_files SET visibility = ? WHERE id= ? `;

//     connection.query(sql, [value, id], (error, results) => {
//         if (error){
//             console.error('Error Updating Visibilityy: ', error);
//             res.status(500).send('Internal Server Error');
//         }else{
//             res.redirect('/file_uploads');
//         };

//     });

// };