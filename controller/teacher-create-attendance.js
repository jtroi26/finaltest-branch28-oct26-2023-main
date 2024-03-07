const mysql = require("mysql");

require('dotenv').config();

const conn = {
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
};

exports.getAttendancePage = (req, res) => {
    const subjectname = req.session.subjectname;
    const sectionname = req.session.sectionname;
    const subjectid = req.session.subjectid;
    const teacherid = req.session.teacherid;

    const sql = `
    SELECT s.id, s.studentID,
        CONCAT(s.firstname, ' ', s.middlename, ' ', s.lastname, ' ',
        CASE WHEN s.suffix = 'none' THEN '' ELSE s.suffix END) AS full_name,
        s.sectionname
    FROM students AS s
    INNER JOIN subjects AS sub ON sub.sectionname = s.sectionname
    WHERE 
        s.status = 'Enrolled' AND sub.sectionname = ? AND sub.teacherid = ? AND sub.subjectid = ? AND sub.subjectname = ?
    ORDER BY 
        s.lastname ASC, s.status DESC;
    `;
    const values = [sectionname, teacherid, subjectid, subjectname];

    const sql2 = `SELECT quarterperiod FROM quarters ORDER BY id ASC;`

    const connection = mysql.createConnection(conn);

    connection.query(sql, values, (err, results) => {
        if (err) {
            console.error('Error fetching enrolled students:', err);
            connection.end();
            res.status(500).send('Internal Server Error');
        } else {
            if (results.length === 0) {
                // No students found with the given criteria, handle this case
                connection.end();
                res.status(404).send('Students not found');
            } else {
                // Student data is available in 'results'
                const studentData = results;
                console.log(studentData);
                // Now, query sql2 to get quarterperiod
                connection.query(sql2, (err, quarters) => {
                    connection.end(); // Close the database connection
                    if (err) {
                        console.error('Error fetching quarters:', err);
                        res.status(500).send('Internal Server Error');
                    } else {
                        // Quarters data is available in 'quarters'
                        const quartersData = quarters;
                        
                        // Render the 'teacher-index-attendance' template and pass both student and quarter data
                        res.render('teacher-create-attendance', { students: studentData, quarters: quartersData, teacherid: req.session.teacherid , sectionname: sectionname, subjectname: subjectname});
                    }
                });
            }
        }
    });
}
exports.postAttendancePage = (req, res) => {
    const currentDate = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = currentDate.toLocaleDateString(undefined, options);

    const subjectname = req.session.subjectname;
    const sectionname = req.session.sectionname;
    const teacherid = req.session.teacherid;

    // Extract data from the request body
    let { studentID, quarterperiod, attendance } = req.body;
    console.log(req.body);
    // Ensure that studentID and attendance are arrays
    if (!Array.isArray(studentID)) {
        // If not an array, convert to an array with a single element
        studentID = [studentID];
        attendance = [attendance];
    }

    // Ensure that the arrays have the same length
    if (studentID.length !== attendance.length) {
        // Handle the error (e.g., return an error response)
        return res.status(400).send('Mismatched data');
    }

    const connection = mysql.createConnection(conn);

    // Loop through the data and insert attendance for each student
    for (let i = 0; i < studentID.length; i++) {
        if (attendance[i] === 'NULL' || attendance[i] === null) {
            // Skip this iteration of the loop if attendance is 'NULL' or null
            continue;
        }

        // If attendance is not 'NULL' or null, proceed to insert data
        const sql = `INSERT INTO studentattendance (studentID, subjectname, sectionname, teacherid, date, quarterperiod, attendance) VALUES (?, ?, ?, ?, ?, ?, ?);`;
        const values = [studentID[i], subjectname, sectionname, teacherid, formattedDate, quarterperiod, attendance[i]];

        connection.query(sql, values, (err, results) => {
            if (err) {
                console.error('Error inserting attendance:', err);
                // Handle the error (e.g., return an error response)
                res.status(500).send('Internal Server Error');
            }
        });
    }

    // Close the database connection after all insertions are complete
    connection.end();

    // Respond with a success message or redirect to another page
    // res.status(200).send('Attendance recorded successfully');
    res.redirect('/teacher/students/attendance');
};