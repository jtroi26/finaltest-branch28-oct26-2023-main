const mysql = require("mysql");
const express = require('express');
const rateLimit = require("express-rate-limit");

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
    host: 'localhost',
    database: 'finalcapstone',
    user: 'root',
    password: ''
};

exports.getLoginPage = (req, res) => {
    res.render('student-login');
};

exports.postStudentLogin = [loginLimiter, (req, res) => {
    const { studentID, studentUserName, studentPassword } = req.body;

    const sql = `
        SELECT s.studentID, s.firstname, s.middlename, s.lastname, s.sectionname
        FROM studentlogins AS sl
        INNER JOIN students AS s ON sl.studentID = s.studentID
        WHERE sl.studentID = ? AND sl.studentUserName = ? AND sl.studentPassword = ?
    `;

    const values = [studentID, studentUserName, studentPassword];
    const connection = mysql.createConnection(conn);
    connection.query(sql, values, (err, results) => {
        if (err) {
            console.error('Cannot Log In:', err);
            res.status(500).send('Internal Server Error');
        } else {
            if (results.length > 0) {
                // Reset the login attempts counter on successful login

                // Make sure "section" is included in the SQL query
                const firstname = results[0].firstname;
                req.session.studentfirstname = firstname;
                const middlename = results[0].middlename;
                req.session.studentmiddlename = middlename;
                const lastname = results[0].lastname;
                req.session.studentlastname = lastname;
                // Make sure "section" is included in the SQL query
                req.session.studentID = studentID;

                // Login successful
                // Render the student dashboard EJS template with user data
                console.log('Already login');
                res.redirect('/student/dashboard');
            } else {
                // Increment the login attempts counter
                req.session.loginAttempts++;

                // Login failed
                console.log('Login Failed');
                return res.render('student-login', {errorMessage: 'Invalid username or password for student.'});
            }
        }
    });
}
];