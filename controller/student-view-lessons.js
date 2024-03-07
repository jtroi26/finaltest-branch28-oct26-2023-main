const mysql = require("mysql");

require('dotenv').config();

const conn = {
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
};

exports.getLessonsView = (req, res) => {
    const subjectname = req.session.subjectname;
    const sectionname = req.session.sectionname;
    const teacherid = req.session.teacherid;
    const studentid = req.session.studentID;
    console.log('in lessons view');

    console.log(subjectname);
            console.log(sectionname);
            console.log(teacherid);

    const sql = `SELECT * FROM lessons WHERE sectionname = ? AND subjectname = ? AND teacherid = ?;`;
    const values = [sectionname, subjectname, teacherid];

    const connection = mysql.createConnection(conn); // Create a new connection

    connection.query(sql, values, (err, results) => {
        if (err) {
            console.error('Error fetching lessons data:', err);
            connection.end(); // Close the database connection in case of an error
            res.status(500).send('Internal Server Error');
        } else {
            // Successfully fetched the lessons data
            // Pass the results to the template
            res.render('student-view-lessons', { lessonsData: results , studentid:studentid });

            connection.end(); // Close the database connection after rendering the template
        }
    });
};


