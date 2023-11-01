const mysql = require("mysql");

const conn = {
    host: 'localhost',
    database: 'finalcapstone',
    user: 'root',
    password: ''
};

exports.getSubjectPage = (req, res) => {
    const connection = mysql.createConnection(conn);
    const id = req.params.id; // Assuming 'id' is a route parameter

    const sql = `SELECT subjectid, subjectname, sectionname, visibility FROM subjects WHERE id = ?`;

    connection.query(sql, [id], (error, results) => {
        if (error) {
            console.error('Error executing SQL query:', error);
            connection.end();
            return res.status(500).send('Internal Server Error');
        }
        if (results.length === 1) {
            // Assuming 'teacher-view-subject' is your EJS template, you can pass the first result to it
            res.render('teacher-view-subject', { subject: results[0] });
        } else {
            // Handle the case when no or multiple results are found
            res.status(404).send('Subject not found');
        }

        // Don't forget to close the connection
        connection.end();
    });
};


