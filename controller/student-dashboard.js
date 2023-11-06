const mysql = require("mysql");

const conn = {
    host: 'localhost',
    database: 'finalcapstone',
    user: 'root',
    password: ''
};

exports.getStudentDashboard = (req, res) => {
    const studentfullname = req.session.studentfirstname + ' ' + req.session.studentmiddlename + ' ' + req.session.studentlastname + ' ' + req.session.suffix;

    const connection = mysql.createConnection(conn);
    const sql = `SELECT students.studentID, 
    CONCAT(students.firstname, ' ', students.middlename, ' ', students.lastname, ' ', students.suffix) AS full_name,
    students.sectionname, 
    subjects.subjectid, 
    subjects.subjectname, 
    subjects.teacherid
    FROM students
    INNER JOIN subjects
    ON subjects.sectionname = students.sectionname
    WHERE students.studentID = ? AND students.sectionname = ? AND subjects.visibility = 'Visible'`;

    const studentid = req.session.studentID;
    const sectionname = req.session.sectionname;

    const values = [studentid, sectionname];

    connection.query(sql, values, (error, results) => {
        if (error) {
            console.error(error);
        } else {
            res.render('student-dashboard', {
                studentfullname,
                studentfirstname: req.session.studentfirstname,
                studentid,
                studentData: results, // Pass the entire results array
            });
        }
    });
};


