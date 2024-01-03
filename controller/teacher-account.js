const mysql = require('mysql2/promise');

const conn = {
    host: 'localhost',
    database: 'finalcapstone',
    user: 'root',
    password: ''
};

exports.getteacherAccount = async (req, res) => {

    res.render('teacher-account', {teacherid: req.session.teacherid});
}

exports.postteacherChangePassword = async (req, res) => {
    const { teacherid, oldPassword, newPassword, confirmPassword } = req.body;

            // Regular expression pattern
    const passwordPattern = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+={}\[\]:;<>,.?\/\\-]).{8,}$/;

            // Validate if newPassword meets the pattern requirements
    if (!passwordPattern.test(newPassword)) {
        return res.render('teacher-account', {
            teacherid: req.session.teacherid,
            error: "New password must contain at least one capital letter, one special character, and be at least 8 characters long"
        });
    }

    // Validate that newPassword and confirmPassword match
    if (newPassword !== confirmPassword) {
        return res.render('teacher-account', {teacherid: req.session.teacherid, error: "New password and confirm password do not match" });
    }

    try {
        // Create a connection pool
        const pool = mysql.createPool(conn);
        const connection = await pool.getConnection();

        // Check if the old password matches the current password in the database
        const [results] = await connection.execute("SELECT * FROM teacherlogins WHERE teacherid = ? AND userpassword = ?", [teacherid, oldPassword]);

        if (results.length > 0) {
            // Update the password in the database
            await connection.execute("UPDATE teacherlogins SET userpassword = ? WHERE teacherid = ?", [newPassword, teacherid]);

            console.log("done changing password.");
            // Password updated successfully
            res.redirect('/teacher/account');
        } else {
            // Old password does not match
            res.render('teacher-account', {teacherid: req.session.teacherid, error: "Old password is incorrect" });
        }

        // Release the connection back to the pool
        connection.release();
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
}