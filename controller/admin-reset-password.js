const mysql = require("mysql");
const bcrypt = require("bcrypt");
require('dotenv').config();

// Create a connection pool to your MySQL database
const pool = mysql.createPool({
    connectionLimit: process.env.DB_CONNECTION_LIMIT, // Adjust the limit based on your needs
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
});

exports.getResetPasswordPage = (req, res) => {
    const sql1 = `SELECT studentID, studentUserName, studentPassword FROM studentlogins`;
    const sql2 = `SELECT teacherid, userlogin, userpassword FROM teacherlogins`;

    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error getting connection from pool:', err);
            return res.status(500).send('Internal Server Error');
        }

        connection.query(sql1, (err, sql1Results) => {
            // Release the connection after the first query
            connection.release();

            if (err) {
                console.error('Error executing SQL query 1:', err);
                return res.status(500).send('Internal Server Error');
            }

            // Now, execute the second query
            pool.getConnection((err, connection) => {
                if (err) {
                    console.error('Error getting connection from pool:', err);
                    return res.status(500).send('Internal Server Error');
                }

                connection.query(sql2, (err, sql2Results) => {
                    // Release the connection after the second query
                    connection.release();

                    if (err) {
                        console.error('Error executing SQL query 2:', err);
                        return res.status(500).send('Internal Server Error');
                    }

                    // Render the page with both sets of results
                    res.render('admin-reset-password', { students: sql1Results, teachers: sql2Results, admin_id: req.session.admin_id });
                });
            });
        });
    });
};

// for students
exports.postStudentResetPassword = (req, res) => {
    const { studentID, newPassword } = req.body;
    const saltRounds = parseInt(process.env.SALT_SACCOUNT, process.env.RADIX);

    bcrypt.hash(newPassword, saltRounds, (hashErr, hashedPassword) => {
        if (hashErr) {
            console.error('Error hashing password:', hashErr);
            return res.status(500).send('Internal Server Error');
        }

        // Assuming your table name is `studentlogins`
        const sql = `UPDATE studentlogins SET studentPassword = ? WHERE studentID = ?`;

        pool.getConnection((connErr, connection) => {
            if (connErr) {
                console.error('Error getting connection from pool:', connErr);
                return res.status(500).send('Internal Server Error');
            }

            connection.query(sql, [hashedPassword, studentID], (queryErr, results) => {
                connection.release();

                if (queryErr) {
                    console.error('Error updating password:', queryErr);
                    return res.render('admin-reset-password');
                }
                console.log('Password successfully reset');
                res.redirect('/admin/reset-password');
            });
        });
    });
}

// for teachers
exports.postTeacherResetPassword = (req, res) => {
    const { teacherid, newPassword } = req.body;

    // Hash the newPassword using bcrypt with the salt from .env
    const saltRounds = parseInt(process.env.SALT_TACCOUNT, process.env.RADIX);
    
    bcrypt.hash(newPassword, saltRounds, (hashErr, hashedPassword) => {
        if (hashErr) {
            console.error('Error hashing password:', hashErr);
            return res.status(500).send('Internal Server Error');
        }

        // Assuming your table name is `teacherlogins`
        const sql = `UPDATE teacherlogins SET userpassword = ? WHERE teacherid = ?`;

        pool.getConnection((connErr, connection) => {
            if (connErr) {
                console.error('Error getting connection from pool:', connErr);
                return res.status(500).send('Internal Server Error');
            }

            connection.query(sql, [hashedPassword, teacherid], (queryErr, results) => {
                connection.release();

                if (queryErr) {
                    console.error('Error updating password:', queryErr);
                    return res.render('admin-reset-password');
                }

                res.redirect('/admin/reset-password');
            });
        });
    });
};