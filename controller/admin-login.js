const mysql = require("mysql");
const bcrypt = require("bcrypt");

require('dotenv').config();
const conn = {
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
};

exports.getAdminLogin = (req, res) => {
    res.render('admin-login');
};

exports.postAdminLogin = (req, res) => {
    const connection = mysql.createConnection(conn);

    const { admin_id, username, userpassword } = req.body;

    // Use placeholders in the SQL query
    const loginSql = 'SELECT admin_id, username, userpassword FROM adminlogins WHERE admin_id = ? AND username = ?';
    const visibilitySql = 'SELECT visibility FROM admindetails WHERE admin_id = ?';

    connection.query(loginSql, [admin_id, username], (err, results) => {
        if (err) {
            console.error('Cannot Log In:', err);
            res.status(500).send('Internal Server Error');
        } else {
            if (results.length > 0) {
                const storedHashedPassword = results[0].userpassword;

                // Check the visibility status of the admin
                connection.query(visibilitySql, [admin_id], (visibilityErr, visibilityResults) => {
                    if (visibilityErr) {
                        console.error('Error checking visibility:', visibilityErr);
                        res.status(500).send('Internal Server Error');
                    } else {
                        if (visibilityResults.length > 0 && visibilityResults[0].visibility === 'Invisible') {
                            console.log('Login forbidden: Admin visibility is Invisible');
                            res.render('admin-login', { errorMessage: 'Login forbidden: Admin visibility is Invisible' });
                        } else {
                            // Compare the provided password with the stored hashed password
                            bcrypt.compare(userpassword, storedHashedPassword, (bcryptErr, result) => {
                                if (bcryptErr) {
                                    console.error('Error comparing passwords:', bcryptErr);
                                    res.status(500).send('Internal Server Error');
                                } else if (result) {
                                    req.session.adminfirstname = results[0].firstname;
                                    req.session.adminmiddlename = results[0].middlename;
                                    req.session.adminlastname = results[0].lastname;
                                    req.session.admin_id = admin_id;
                                    req.session.adminusername = username;

                                    console.log('Login successful');
                                    res.redirect('/admin/dashboard');
                                } else {
                                    console.log('Login failed');
                                    res.render('admin-login', { errorMessage: 'Invalid username or password' });
                                }
                            });
                        }
                    }
                });
            } else {
                console.log('Login failed');
                res.render('admin-login', { errorMessage: 'Invalid username or password' });
            }
        }
    });
};

