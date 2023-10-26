const mysql = require("mysql");

const conn = {
    host: 'localhost',
    database: 'finalcapstone',
    user: 'root',
    password: ''
};

exports.getSubjectIndexPage = (req, res) => {
    const sql = `
    SELECT
    s.subjectid,
    s.subjectname,
    td.teacherid,
    CONCAT(td.firstname, ' ', td.middlename, ' ', td.lastname) as teacher_fullname
FROM subjects as s
INNER JOIN teacherdetails as td on s.teacherid = td.teacherid
WHERE s.visibility = "Visible";
    `;

    const connection = mysql.createConnection(conn);

    connection.connect((err) => {
        if (err) {
            console.error('Error connecting to the database:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        connection.query(sql, (err, results) => {
            if (err) {
                console.error('Error:', err);
                res.status(500).send('Internal Server Error');
                return;
            }

            connection.end(); // Close the database connection

            // Pass the data to your EJS template and render it
            console.log(results);
            res.render('admin-index-subject', { data: results });
        });
    });
};

