const mysql = require("mysql");

const conn = {
    host: 'localhost',
    database: 'finalcapstone',
    user: 'root',
    password: ''
};

exports.getIndexPage = (req, res) => {
    const sectionname = req.session.sectionname;
    const subjectid = req.session.subjectid;
    const subjectname = req.session.subjectname;
    const teacherid = req.session.teacherid;

    const sql = `SELECT id, assessmenttype FROM assessmenttype ORDER BY id ASC;`;

    const connection = mysql.createConnection(conn);

    connection.query(sql, (error, results) => {
        if (error) {
            throw error;
        }
        console.log(results);
        // You can use the 'results' variable to access the query results.
        // For example, console.log(results);

        // Close the connection after handling the results
        connection.end();

        res.render('teacher-index-grades', { results });
    });
};
