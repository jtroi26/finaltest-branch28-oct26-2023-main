const mysql = require("mysql");

const conn = {
    host: 'localhost',
    database: 'finalcapstone',
    user: 'root',
    password: ''
};

exports.getLessonsView = (req, res) => {
    const subjectname = req.session.subjectname;
    const sectionname = req.session.sectionname;
    const teacherid = req.session.teacherid;
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
            res.render('student-view-lessons', { lessonsData: results });

            connection.end(); // Close the database connection after rendering the template
        }
    });
};


