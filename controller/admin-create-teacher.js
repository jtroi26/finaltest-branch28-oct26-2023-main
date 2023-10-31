const mysql = require("mysql");

const conn = {
    host: 'localhost',
    database: 'finalcapstone',
    user: 'root',
    password: ''
};

exports.getTeacherCreatePage = (req, res) => {
    res.render('admin-create-teacher');
};