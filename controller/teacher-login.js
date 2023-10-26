const mysql = require("mysql");

const conn = {
    host: 'localhost',
    database: 'finalcapstone',
    user: 'root',
    password: ''
};

exports.getLoginPage = (req, res) => {
    res.render('teacher-login');
};

exports.postTeacherLogin = (req, res) => {
    const connection = mysql.createConnection(conn);

    const {teacherid, userlogin, userpassword } = req.body;

    // Use placeholders in the SQL query
    const sql = `SELECT teacherlogins.teacherid, teacherdetails.firstname, teacherdetails.middlename, teacherdetails.lastname
    FROM teacherlogins
    INNER JOIN teacherdetails ON teacherlogins.teacherid = teacherdetails.teacherid
    WHERE teacherlogins.teacherid =? AND teacherlogins.userlogin = ? AND teacherlogins.userpassword = ?`;

    connection.query(sql, [teacherid, userlogin, userpassword], (err, results) => {
        if (err) {
            console.error('Cannot Log In:', err);
            res.status(500).send('Internal Server Error');
        } else {
            if (results.length > 0) {

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
                return res.render('teacher-login', {errorMessage: 'Invalid username or password for student.'});
            }
        }
        connection.end();
    });
};