const mysql = require("mysql");

const conn = {
    host: 'localhost',
    database: 'tesstt',
    user: 'root',
    password: ''
};

exports.getStudentDashboard = (req, res) => {

    res.render('student-dashboard', {
        
        studentfirstname: req.session.studentfirstname,
        studentmiddlename: req.session.studentmiddlename,
        studentlastname: req.session.studentlastname,
        studentID: req.session.studentID});
};