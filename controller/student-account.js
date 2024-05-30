const mysql = require("mysql");
const bcrypt = require("bcrypt");
require('dotenv').config();

const pool = mysql.createPool({
    connectionLimit: process.env.DB_CONNECTION_LIMIT,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
});

exports.getstudentAccount = async (req, res) => {
    res.render('student-account', { studentid: req.session.studentID });
}

exports.postChangePassword = async (req, res) => {
    const { studentID, oldPassword, newPassword, confirmPassword } = req.body;
    const saltRounds = parseInt(process.env.SALT_SACCOUNT, process.env.RADIX);

    // Regular expression pattern
    const passwordPattern = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+={}\[\]:;<>,.?\/\\-]).{8,}$/;

    // Validate if newPassword meets the pattern requirements
    if (!passwordPattern.test(newPassword)) {
        return res.render('student-account', {
            studentid: req.session.studentID,
            error: "New password must contain at least one capital letter, one special character, and be at least 8 characters long"
        });
    }

    // Validate that newPassword and confirmPassword match
    if (newPassword !== confirmPassword) {
        return res.render('student-account', {
            studentid: req.session.studentID,
            error: "New password and confirm password do not match"
        });
    }

    pool.getConnection((connErr, connection) => {
        if (connErr) {
            console.error('Error getting connection from pool:', connErr);
            return res.status(500).send('Internal Server Error');
        }

        // Check if the old password matches the current password in the database
        const query = "SELECT studentPassword FROM studentlogins WHERE studentID = ?";
        connection.query(query, [studentID], (queryErr, results) => {
            if (queryErr) {
                console.error('Error executing query:', queryErr);
                connection.release();
                return res.status(500).send('Internal Server Error');
            }

            if (results.length === 0) {
                connection.release();
                return res.render('student-account', {
                    studentid: req.session.studentID,
                    error: "Old password is incorrect"
                });
            }

            const storedHashedPassword = results[0].studentPassword;

            bcrypt.compare(oldPassword, storedHashedPassword, (compareErr, isMatch) => {
                if (compareErr) {
                    console.error('Error comparing passwords:', compareErr);
                    connection.release();
                    return res.status(500).send('Internal Server Error');
                }

                if (!isMatch) {
                    connection.release();
                    return res.render('student-account', {
                        studentid: req.session.studentID,
                        error: "Old password is incorrect"
                    });
                }

                // Hash the new password
                bcrypt.hash(newPassword, saltRounds, (hashErr, hashedPassword) => {
                    if (hashErr) {
                        console.error('Error hashing password:', hashErr);
                        connection.release();
                        return res.status(500).send('Internal Server Error');
                    }

                    // Update the password in the database
                    const updateQuery = "UPDATE studentlogins SET studentPassword = ? WHERE studentID = ?";
                    connection.query(updateQuery, [hashedPassword, studentID], (updateErr) => {
                        connection.release();

                        if (updateErr) {
                            console.error('Error updating password:', updateErr);
                            return res.status(500).send('Internal Server Error');
                        }

                        console.log("Password successfully changed.");
                        res.redirect('/student/account');
                    });
                });
            });
        });
    });
}
