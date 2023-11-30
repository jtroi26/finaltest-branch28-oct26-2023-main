const mysql = require("mysql");

// Create a connection to your MySQL database
const conn = mysql.createConnection({
    host: 'localhost',
    database: 'finalcapstone',
    user: 'root',
    password: ''
});
// Connect to the database
conn.connect((err) => {
    if (err) {
        console.error('Error connecting to database', err);
        return;
    }
    console.log('Connected to database');
});

exports.getresetpassword = (req, res) => {
    // Execute the first SQL query
    conn.query('SELECT studentID, studentUserName, studentPassword FROM studentlogins', (err, studentResults) => {
        if (err) {
            console.error('Error executing student query', err);
            return;
        }

        // Execute the second SQL query
        conn.query('SELECT teacherid, userlogin, userpassword FROM teacherlogins', (err, teacherResults) => {
            if (err) {
                console.error('Error executing teacher query', err);
                return;
            }

            // Render your EJS template and pass the query results
            res.render('admin-reset-password', { students: studentResults, teachers: teacherResults, admin_id: req.session.admin_id });
        });
    });
    // res.render('admin-reset-password');
}


exports.postStudentResetPassword = (req, res) => {
    const connection = mysql.createConnection(conn);

    const { studentID, newPassword } = req.body;

    // Assuming your table name is `studentlogins`
    const sql = `UPDATE studentlogins SET studentPassword = ? WHERE studentID = ?`;

    conn.query(sql, [newPassword, studentID], (err, results) => {
        if (err) {
            console.error('Error updating password:', err);
            res.render('admin-reset-password');
        } else {
            res.redirect('/admin/reset-password');
        }
    });
}

exports.postTeacherResetPassword = (req, res) => {
    const connection = mysql.createConnection(conn);

    const { teacherid, newPassword } = req.body;

    // Assuming your table name is `studentlogins`
    const sql = `UPDATE teacherlogins SET userpassword = ? WHERE teacherid = ?`;

    conn.query(sql, [newPassword, teacherid], (err, results) => {
        if (err) {
            console.error('Error updating password:', err);
            res.render('admin-reset-password');
        } else {
            res.redirect('/admin/reset-password');
        }
    });
}