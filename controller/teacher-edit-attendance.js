const mysql = require("mysql");

const conn = {
    host: 'localhost',
    database: 'finalcapstone',
    user: 'root',
    password: ''
};
exports.getEditAttendancePage = (req, res) => {
    const connection = mysql.createConnection(conn);
    const { id } = req.params;
    const sql = `
    SELECT
        satt.id,
        s.studentID,
        CONCAT_WS(' ',
            s.firstname,
            COALESCE(s.middlename, ''),
            s.lastname,
            COALESCE(NULLIF(s.suffix, 'none'), '')
        ) AS full_name,
        satt.sectionname,
        satt.date,
        satt.quarterperiod,
        satt.attendance
    FROM students AS s
    INNER JOIN studentattendance AS satt ON s.studentID = satt.studentID
    WHERE satt.id = ?;
    `;

    connection.query(sql, [id], (err, results) => {
        if (err) {
            console.error('Error fetching attendance data:', err);
            // Handle the error (e.g., return an error response)
            res.status(500).send('Internal Server Error');
        } else {
            // Attendance data is available in 'results'
            const attendanceData = results[0]; // Assuming you expect only one result
            console.log(results[0]);
            // Close the database connection
            connection.end();

            // Render the 'teacher-edit-attendance' template and pass the attendance data
            res.render('teacher-edit-attendance', { attendance: attendanceData, teacherid: req.session.teacherid });
        }
    });
};

exports.postEditAttendance = (req, res) => {
    const { id } = req.params;
    const { date, quarterperiod, attendance } = req.body;
    
    // Format the date
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Date(date).toLocaleDateString(undefined, options);

    const sql = `
    UPDATE studentattendance
    SET
    date = ?,
    quarterperiod = ?,
    attendance = ?
    WHERE id = ?
    `;

    const values = [formattedDate, quarterperiod, attendance, id];

    const connection = mysql.createConnection(conn);

    connection.query(sql, values, (err, results) => {
        connection.end(); // Close the database connection

        if (err) {
            console.error('Error updating attendance:', err);
            // Handle the error (e.g., return an error response)
            return res.status(500).send('Internal Server Error');
        }

        // Redirect to a success page or return a success response
        res.redirect('/teacher/students/attendance'); // Replace with your desired success page
    });
};