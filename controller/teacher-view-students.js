const mysql = require("mysql");

const conn = {
    host: 'localhost',
    database: 'finalcapstone',
    user: 'root',
    password: ''
};

exports.getStudentsPageView = (req, res) => {
    const subjectname = req.session.subjectname;
    const sectionname = req.session.sectionname;
    const teacherid = req.session.teacherid;

    const sql = `SELECT 
    s.studentID,
    CONCAT(s.firstname, ' ', s.middlename, ' ', s.lastname, ' ', s.suffix) AS full_name,
    s.sectionname
    FROM students AS s
    INNER JOIN subjects AS sub ON sub.sectionname = s.sectionname
    WHERE s.status = 'Enrolled' 
        AND sub.subjectname = ? 
        AND sub.sectionname = ?
        AND sub.teacherid = ?
    ORDER BY s.lastname ASC;`;

    const values = [subjectname, sectionname, teacherid];

    // Create a database connection
    const connection = mysql.createConnection(conn);

    connection.query(sql, values, (err, results) => {
        if (err) {
            console.error('Error fetching enrolled students:', err);
            connection.end();
            res.status(500).send('Internal Server Error');
        } else {
            if (results.length === 0) {
                // No students found with the given criteria, handle this case
                connection.end();
                res.status(404).send('Students not found');
            } else {
                // Student data is available in 'results'
                const studentData = results;
                console.log(studentData);
                // Render the 'teacher-view-lesson' template and pass the student data
                res.render('teacher-view-students', { students: studentData , subjectname, sectionname, teacherid: req.session.teacherid});

                // Close the database connection
                connection.end();
            }
        }
    });
};
