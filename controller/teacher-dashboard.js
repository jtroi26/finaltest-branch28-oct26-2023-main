const mysql = require("mysql");

const conn = {
    host: 'localhost',
    database: 'finalcapstone',
    user: 'root',
    password: ''
};

exports.getTeacherDashboard = (req, res) => {
    const connection = mysql.createConnection(conn);

    const sql = `
        SELECT subj.id, subj.subjectid, subj.subjectname, subj.teacherid, subj.sectionname, td.firstname, td.middlename, td.lastname, td.department
        FROM subjects AS subj
        INNER JOIN teacherdetails AS td ON subj.teacherid = td.teacherid
        WHERE td.teacherid = ? AND subj.visibility = 'Visible' ORDER BY subj.sectionname ASC 
    `;

    connection.query(sql, [req.session.teacherid], (error, results) => {
        if (error) {
            console.error(error);
            // Handle the error, e.g., render an error page
        } else {
            res.render('teacher-dashboard', {
                teacherusername: req.session.teacherusername,
                firstname: req.session.teacherfirstname,
                middlename: req.session.teachermiddlename,
                lastname: req.session.teacherlastname,
                teacherid: req.session.teacherid,
                subjects: results // Pass the SQL query results to the EJS template
            });
        }
    });

    connection.end(); // Close the database connection
};