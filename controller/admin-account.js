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

exports.getadminAccount = async (req, res) => {
    res.render('admin-account', {admin_id: req.session.admin_id});
}

exports.postadminChangePassword = async (req, res) => {
    const { admin_id, oldPassword, newPassword, confirmPassword } = req.body;
    const saltRounds = parseInt(process.env.SALT_SACCOUNT, process.env.RADIX);

    console.log(admin_id);
    // Regular expression pattern
    const passwordPattern = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+={}\[\]:;<>,.?\/\\-]).{8,}$/;

    // Validate if newPassword meets the pattern requirements
    if (!passwordPattern.test(newPassword)) {
        return res.render('admin-account', {
            admin_id: req.session.admin_id,
            error: "New password must contain at least one capital letter, one special character, and be at least 8 characters long"
        });
    }

    // Validate that newPassword and confirmPassword match
    if (newPassword !== confirmPassword) {
        return res.render('admin-account', {admin_id: req.session.admin_id, error: "New password and confirm password do not match" });
    }

    pool.getConnection((connErr, connection) => {
        if (connErr) {
            console.error('Error getting connection from pool:', connErr);
            return res.status(500).send('Internal Server Error');
        }

        const query = "SELECT userpassword FROM adminlogins WHERE admin_id = ?";
        connection.query(query, [admin_id], (queryErr, results) => {
            if (queryErr) {
                console.error('Error querying database:', queryErr);
                connection.release();
                return res.status(500).send('Internal Server Error');
            }

            if (results.length === 0) {
                connection.release();
                return res.render('admin-account', {
                    admin_id: req.session.admin_id,
                    error: "Old password is incorrect1"
                });
            }

            const storedHashedPassword = results[0].userpassword;

            bcrypt.compare(oldPassword, storedHashedPassword, (compareErr, isMatch) => {
                if (compareErr) {
                    console.error('Error comparing passwords:', compareErr);
                    connection.release();
                    return res.status(500).send('Internal Server Error');
                }

                if (!isMatch) {
                    connection.release();
                    return res.render('admin-account', {
                        admin_id: req.session.admin_id,
                        error: "Old password is incorrect"
                    });
                }

                // Hash the new Password
                bcrypt.hash(newPassword, saltRounds, (hashErr, hashedPassword) => {
                    if (hashErr) {
                        console.error('Error hashing password:', hashErr);
                        connection.release();
                        return res.status(500).send('Internal Server Error');
                    }

                    // Update the password in the database
                    const updateQuery = "UPDATE adminlogins SET userpassword = ? WHERE admin_id = ?";
                    connection.query(updateQuery, [hashedPassword, admin_id], (updateErr) => {
                        connection.release();

                        if (updateErr) {
                            console.error('Error updating password:', updateErr);
                            return res.status(500).send('Internal Server Error');
                        }

                        console.log("Password successfully changed.");
                        res.redirect('/admin/account');
                    });
                });
            });
        });
    });
}
