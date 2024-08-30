const mysql = require("mysql");

require('dotenv').config();

const conn = {
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
};

// Create a connection pool
const pool = mysql.createPool(conn);

exports.getIndexPage = (req, res) => {
        res.render('teacher-ethical-consideration')
}