const mysql = require("mysql");

const conn = {
    host: 'localhost',
    database: 'finalcapstone',
    user: 'root',
    password: ''
};

exports.getAttendancePage = (req, res) => {
    const subjectname = req.session.subjectname;
      res.render(teacher-index-attendance); 
}