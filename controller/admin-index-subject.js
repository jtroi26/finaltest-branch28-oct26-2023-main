const mysql = require("mysql");

require('dotenv').config();

const conn = {
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
};

exports.getSubjectIndexPage = (req, res) => {
    const sql = `
    SELECT
    s.id,
    s.subjectid,
    s.subjectname,
    s.sectionname,
    td.teacherid,
    s.visibility,
    td.firstname,
    td.middlename,
    td.lastname,
    CONCAT(td.firstname, ' ', td.middlename, ' ', td.lastname) as teacher_fullname
    FROM subjects as s
    INNER JOIN teacherdetails as td on s.teacherid = td.teacherid
    ORDER BY s.subjectid;
     
    `;
    const sectionsql = `SELECT sectionname FROM sections WHERE visibility = 'Visible'`;
    const teachersql = `SELECT id, teacherid, firstname, middlename, lastname, suffix FROM teacherdetails WHERE visibility = 'Visible' ORDER BY id;`;

    const connection = mysql.createConnection(conn);

    connection.connect((err) => {
        if (err) {
            console.error('Error connecting to the database:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        // Execute the main SQL query
        connection.query(sql, (err, results) => {
            if (err) {
                console.error('Error:', err);
                connection.end(); // Close the database connection in case of an error
                res.status(500).send('Internal Server Error');
                return;
            }

            // Execute the teachersql query
            connection.query(teachersql, (err, teacherResults) => {
                if (err) {
                    console.error('Error:', err);
                    connection.end(); // Close the database connection in case of an error
                    res.status(500).send('Internal Server Error');
                    return;
                }
                connection.query(sectionsql, (err, sectionResults) => {
                    if (err) {
                        console.error('Error:', err);
                        connection.end(); // Close the database connection in case of an error
                        res.status(500).send('Internal Server Error');
                        return;
                    }

                    connection.end(); // Close the database connection

                    // Pass the data to your EJS template and render it
                    res.render('admin-index-subject', { data: results, teacher: teacherResults,section:sectionResults, admin_id: req.session.admin_id });

                });
            });
        });
    });
};

