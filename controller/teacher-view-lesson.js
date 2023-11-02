const mysql = require("mysql");

const conn = {
    host: 'localhost',
    database: 'finalcapstone',
    user: 'root',
    password: ''
};

exports.getLessonPageView = (req, res) => {
    res.render('teacher-view-lesson');
}