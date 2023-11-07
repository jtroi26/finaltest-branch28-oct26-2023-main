const mysql = require("mysql");

const conn = {
    host: 'localhost',
    database: 'finalcapstone',
    user: 'root',
    password: ''
};

exports.getAttendanceIndexPage = (req, res) => {
    // const connection = mysql.createConnection(conn);

    const sql = `SELECT * FROM teacherannouncements WHERE teacherid = ? AND subjectname = ? AND sectionname = ? ORDER BY dateCreated DESC;`;
    
    res.render('teacher-index-attendance');
};