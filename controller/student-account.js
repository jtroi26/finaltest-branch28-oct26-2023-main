const mysql = require('mysql2/promise');

const conn = {
    host: 'localhost',
    database: 'finalcapstone',
    user: 'root',
    password: ''
};


exports.getstudentAccount = async (req, res) => {

    res.render('student-account', {studentid: req.session.studentID});
}

exports.postChangePassword = async (req, res) => {
    const { studentID, oldPassword, newPassword, confirmPassword } = req.body;

    try {
        // Create a connection pool
        const pool = mysql.createPool(conn);
        const connection = await pool.getConnection();

        // Check if the old password matches the current password in the database
        const [results] = await connection.execute("SELECT * FROM studentlogins WHERE studentID = ? AND studentPassword = ?", [studentID, oldPassword]);

        if (results.length > 0) {
            // Update the password in the database
            await connection.execute("UPDATE studentlogins SET studentPassword = ? WHERE studentID = ?", [newPassword, studentID]);

            console.log("done changing password.");
            // Password updated successfully
            res.redirect('/student/account');
        } else {
            // Old password does not match
            console.log("old password does not password.");
            res.render('student-account', { errorChange: 'Old Password does not match' });
        }

        // Release the connection back to the pool
        connection.release();
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
}