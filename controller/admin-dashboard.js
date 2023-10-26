const mysql = require("mysql");

const conn = {
    host: 'localhost',
    database: 'finalcapstone',
    user: 'root',
    password: ''
};

exports.getDashboard = (req, res) => {
    res.render('admin-dashboard', {admin_id: req.session.admin_id});
};