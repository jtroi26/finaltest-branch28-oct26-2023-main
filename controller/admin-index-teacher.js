const mysql = require("mysql");

const conn = {
    host: 'localhost',
    database: 'finalcapstone',
    user: 'root',
    password: ''
};

exports.getIndexTeacherPage = (req, res) => {
    res.render('admin-index-teacher');
}