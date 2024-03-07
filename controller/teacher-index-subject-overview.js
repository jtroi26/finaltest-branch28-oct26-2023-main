const mysql = require("mysql");

require('dotenv').config();

const conn = {
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
};

exports.getIndexPage = (req, res) => {
    const sectionname = req.session.sectionname;
    const subjectid = req.session.subjectid;
    const subjectname = req.session.subjectname;
    const teacherid = req.session.teacherid;

    const sql = `SELECT id, teacherid, subjectname, sectionname, overview FROM subjectoverview 
    WHERE teacherid = ? AND subjectname = ? AND sectionname = ?;`;
    const values = [teacherid, subjectname, sectionname];

    const connection = mysql.createConnection(conn);

    connection.query(sql,values,(error, results) => {
        if (error) {
            throw error;
        }
        console.log(results);
        // You can use the 'results' variable to access the query results.
        // For example, console.log(results);

        // Close the connection after handling the results
        connection.end();

        res.render('teacher-index-subject-overview', {results , teacherid});
    });
};