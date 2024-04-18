const mysql = require('mysql2/promise');

require('dotenv').config();

const conn = {
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
};

exports.getadminAccount = async (req, res) => {

    res.render('admin-account', {admin_id: req.session.admin_id});
}

exports.postadminChangePassword = async (req, res) => {
    const { adminID, oldPassword, newPassword, confirmPassword } = req.body;

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

    try {
        // Create a connection pool
        const pool = mysql.createPool(conn);
        const connection = await pool.getConnection();

        // Check if the old password matches the current password in the database
        const [results] = await connection.execute("SELECT * FROM adminlogins WHERE admin_id = ? AND userpassword = ?", [adminID, oldPassword]);

        if (results.length > 0) {
            // Update the password in the database
            await connection.execute("UPDATE adminlogins SET userpassword = ? WHERE admin_id = ?", [newPassword, adminID]);

            console.log("done changing password.");
            // Password updated successfully
            res.redirect('/admin/account');
        } else {
            // Old password does not match
            res.render('admin-account', {admin_id: req.session.admin_id, error: "Old password is incorrect" });
        }

        // Release the connection back to the pool
        connection.release();
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
}