const mysql = require("mysql");
const bcrypt = require("bcrypt");
const rateLimit = require("express-rate-limit");
require('dotenv').config();
const maxLoginAttempts = 5;

const loginLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes window
    max: maxLoginAttempts, // Maximum number of login attempts
    handler: function (req, res) {
        const remainingTime = req.rateLimit.resetTime - Date.now();
        res.render('student-login', { errorMessagemax: 'You have reached the maximum login attempts. ratelimit', remainingTime: Math.ceil(remainingTime / 1000) });
    }
});



const conn = {
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
};

exports.getLoginPage = (req, res) => {
    res.render('student-login');
};

exports.postStudentLogin = [loginLimiter, (req, res) => {
    const { studentID, studentUserName, studentPassword } = req.body;

    const sql = `
        SELECT s.studentID, s.firstname, s.middlename, s.lastname, s.suffix, s.sectionname, sl.studentPassword
        FROM studentlogins AS sl
        INNER JOIN students AS s ON sl.studentID = s.studentID
        WHERE sl.studentID = ? AND sl.studentUserName = ?
    `;

    const connection = mysql.createConnection(conn);

    connection.query(sql, [studentID, studentUserName], (err, results) => {
        if (err) {
            console.error('Cannot Log In:', err);
            res.status(500).send('Internal Server Error');
        } else {
            if (results.length > 0) {
                const storedHashedPassword = results[0].studentPassword;

                bcrypt.compare(studentPassword, storedHashedPassword, function (err, result) {
                    if (result) {
                        // Reset the login attempts counter on successful login
                        req.session.loginAttempts = 0;

                        // Set session variables for the student
                        req.session.studentID = studentID;
                        req.session.studentfirstname = results[0].firstname;
                        req.session.studentmiddlename = results[0].middlename;
                        req.session.studentlastname = results[0].lastname;
                        req.session.sectionname = results[0].sectionname;
                        req.session.suffix = results[0].suffix;

                        // Login successful
                        console.log('Already login');
                        res.redirect('/student/dashboard');
                    } else {
                        // Increment the login attempts counter
                        req.session.loginAttempts++;

                        // Login failed
                        console.log('Login Failed');
                        res.render('student-login', { errorMessage: 'Invalid username or password for student.' });
                    }
                });
            } else {
                // Increment the login attempts counter
                req.session.loginAttempts++;

                // Login failed
                console.log('Login Failed');
                res.render('student-login', { errorMessage: 'Invalid username or password for student.' });
            }

            // Close the MySQL connection after the query
            connection.end();
        }
    });
}];
