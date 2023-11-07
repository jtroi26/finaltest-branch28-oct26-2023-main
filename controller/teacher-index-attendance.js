const mysql = require("mysql");

const conn = {
    host: 'localhost',
    database: 'finalcapstone',
    user: 'root',
    password: ''
};

exports.getAttendancePage = (req, res) => {
    const subjectname = req.session.subjectname;
    const sectionname = req.session.sectionname;
    const subjectid = req.session.subjectid;
    const teacherid = req.session.teacherid;

    const sql = `SELECT s.id, s.studentID,
    CONCAT(s.firstname, ' ', s.middlename, ' ', s.lastname, ' ', 
    CASE WHEN s.suffix = 'none' THEN '' ELSE s.suffix END) AS full_name,
    s.sectionname, sub.id
    FROM students AS s
    INNER JOIN subjects AS sub ON sub.sectionname = s.sectionname
    WHERE 
    s.status = 'Enrolled' AND sub.sectionname = ? AND sub.teacherid = ?
    ORDER BY 
    s.lastname ASC, s.status DESC;`;
    const values = [sectionname, teacherid, ]

    res.render('teacher-index-attendance');
}