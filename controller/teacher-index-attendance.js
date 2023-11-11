const mysql = require("mysql");

const conn = {
    host: 'localhost',
    database: 'finalcapstone',
    user: 'root',
    password: ''
};

exports.getAttendanceIndexPage = (req, res) => {
    const connection = mysql.createConnection(conn);
    const teacherid = req.session.teacherid;
    const subjectname = req.session.subjectname;
    const sectionname = req.session.sectionname;

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
        satt.subjectname,
        satt.sectionname,
        satt.teacherid,
        satt.date,
        satt.quarterperiod,
        satt.attendance
    FROM students AS s
    INNER JOIN studentattendance AS satt ON satt.studentID = s.studentID
    WHERE satt.subjectname = ?
        AND satt.sectionname = ?
        AND satt.teacherid = ?
        AND s.status = 'Enrolled';
    `;

    const values = [subjectname, sectionname, teacherid];

    connection.query(sql, values, (err, results) => {
        if (err) {
            console.error('Error fetching attendance data:', err);
            // Handle the error (e.g., return an error response)
            res.status(500).send('Internal Server Error');
        } else {
            // Student attendance data is available in 'results'
            console.log('in attendance page');
            const attendanceData = results;
            console.log(attendanceData);

            // Render the 'teacher-index-attendance' template and pass the attendance data
            res.render('teacher-index-attendance', { attendance: attendanceData, teacherid: teacherid, subjectname: subjectname, sectionname: sectionname });

            // Close the database connection
            connection.end();
        }
    });
};

exports.postAttendanceIndexPage = (req, res) => {
    const teacherid = req.session.teacherid;
    const subjectname = req.session.subjectname;
    const sectionname = req.session.subjectname;

    const {date, quarterperiod} = req.body;


    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString(undefined, options);
    console.log(formattedDate);
    
    console.log(req.body);
    // const sql = `
    
    // SELECT
    //     s.id,
    //     s.studentID,
    //     CONCAT_WS(' ',
    //         s.firstname,
    //         COALESCE(s.middlename, ''),
    //         s.lastname,
    //         COALESCE(NULLIF(s.suffix, 'none'), '')
    //     ) AS full_name,
    //     satt.subjectname,
    //     satt.sectionname,
    //     satt.teacherid,
    //     satt.date,
    //     satt.quarterperiod,
    //     satt.attendance
    // FROM students AS s
    // INNER JOIN studentattendance AS satt ON satt.studentID = s.studentID
    // WHERE satt.subjectname = 'MATHTEST'
    //     AND satt.sectionname = 'VII - St. Lorenzo'
    //     AND satt.teacherid = '10420012023'
    //     AND satt.date = 'November 8, 2023'
    //     AND satt.quarterperiod = 'First Quarter';

    // `;

    // const values = [subjectname, sectionname, teacherid, date, quarterperiod];
    res.render('teacher-index-attendance');
}