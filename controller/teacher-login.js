const mysql = require("mysql");
const bcrypt = require("bcrypt");

require('dotenv').config();

const conn = {
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
};

exports.getLoginPage = (req, res) => {
    res.render('teacher-login');
};

exports.postTeacherLogin = (req, res) => {
    const connection = mysql.createConnection(conn);

    const { teacherid, userlogin, userpassword } = req.body;

    // Use placeholders in the SQL query
    const sql = `
        SELECT teacherlogins.teacherid, teacherdetails.firstname, teacherdetails.middlename, teacherdetails.lastname, teacherlogins.userpassword, teacherdetails.visibility
        FROM teacherlogins
        INNER JOIN teacherdetails ON teacherlogins.teacherid = teacherdetails.teacherid
        WHERE teacherlogins.teacherid = ? AND teacherlogins.userlogin = ?
    `;

    connection.query(sql, [teacherid, userlogin], (err, results) => {
        if (err) {
            console.error('Cannot Log In:', err);
            res.status(500).send('Internal Server Error');
        } else {
            if (results.length > 0) {
                if (results[0].visibility === 'Invisible') {
                    console.log('Login Failed, Account Disabled');
                    res.render('teacher-login', { errorMessage: 'Teacher Account is disabled.' });
                } else if (results[0].visibility === 'Visible') {
                    const storedHashedPassword = results[0].userpassword;

                    bcrypt.compare(userpassword, storedHashedPassword, function (err, result) {
                        if (result) {
                            const firstname = results[0].firstname;
                            req.session.teacherfirstname = firstname;
                            const middlename = results[0].middlename;
                            req.session.teachermiddlename = middlename;
                            const lastname = results[0].lastname;
                            req.session.teacherlastname = lastname;
                            req.session.teacherid = teacherid;
                            req.session.teacherusername = userlogin;

                            // Login successful
                            res.redirect('/teacher/dashboard');
                        } else {
                            // Increment the login attempts counter
                            req.session.loginAttempts++;

                            // Login failed
                            console.log('Login Failed');
                            res.render('teacher-login', { errorMessage: 'Invalid username or password for teacher.' });
                        }
                    });
                } else {
                    // Handle other visibility statuses if necessary
                    console.log('Login Failed, Invalid Status');
                    res.render('teacher-login', { errorMessage: 'Invalid teacher status.' });
                }
            } else {
                // Increment the login attempts counter
                req.session.loginAttempts++;

                // Login failed
                console.log('Login Failed');
                res.render('teacher-login', { errorMessage: 'Invalid username or password for teacher.' });
            }
        }
    });
};
