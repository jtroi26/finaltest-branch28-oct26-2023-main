const mysql = require("mysql");

const conn = {
    host: 'localhost',
    database: 'tesstt',
    user: 'root',
    password: ''
};

exports.getStudentDashboard = (req, res) => {

    res.render('student-dashboard');
};