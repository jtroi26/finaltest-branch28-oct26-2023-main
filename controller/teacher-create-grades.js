const mysql = require("mysql");

require('dotenv').config();

const conn = {
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
};

exports.getGradesPage = (req, res) => {
    const connection = mysql.createConnection(conn);
    const sectionname = req.session.sectionname;
    const subjectid = req.session.subjectid;
    const subjectname = req.session.subjectname;
    const teacherid = req.session.teacherid;

    console.log('In grades page');

    console.log(sectionname);
    console.log(subjectid);
    console.log(teacherid);

    const sql = `SELECT
    s.id,
    s.studentID,
    CONCAT(s.lastname, ', ', s.firstname, ' ', s.suffix, ', ', SUBSTRING(s.middlename, 1, 1), '.') AS full_name,
    s.sectionname,
    sub.teacherid,
    sub.subjectid,
    s.status
    
FROM students AS s
INNER JOIN subjects AS sub
ON sub.sectionname = s.sectionname
WHERE sub.teacherid = ?  
    AND sub.subjectid = ?  
    AND s.sectionname = ?  
    AND s.status = 'Enrolled'
ORDER BY full_name ASC, s.status ASC;`;
    const assessmenttypesql = `SELECT assessmenttype FROM assessmenttype ORDER BY assessmenttype ASC`;
    const quarterperiodsql = `SELECT quarterperiod FROM quarters ORDER BY id`;

    const values = [teacherid, subjectid, sectionname];

    connection.query(sql, values, (error, results) => {
        if (error) {
            console.error(error);
            // Handle the error and return an error response
            return res.status(500).send('Internal Server Error');
        } else {
            // Fetch assessment types and quarter periods
            connection.query(assessmenttypesql, (err, assessmentTypeResults) => {
                if (err) {
                    console.error(err);
                    // Handle the error and return an error response
                    return res.status(500).send('Internal Server Error');
                } else {
                    connection.query(quarterperiodsql, (err, quarterPeriodResults) => {
                        if (err) {
                            // Close the database connection after all queries have been executed
                            connection.end();
                            console.error(err);
                            // Handle the error and return an error response
                            return res.status(500).send('Internal Server Error');
                        } else {
                            // Close the database connection after all queries have been executed
                            connection.end();
                            console.log(results);
                            res.render('teacher-create-grades', {
                                students: results,
                                subjectname: subjectname,
                                sectionname: sectionname,
                                assessmentTypes: assessmentTypeResults,
                                quarterPeriods: quarterPeriodResults,
                                teacherid: req.session.teacherid,
                            });
                        }
                    });
                }
            });
        }
    });

    
};


exports.postGradesPage = (req, res) => {
    const sectionname = req.session.sectionname;
    const subjectid = req.session.subjectid;
    const subjectname = req.session.subjectname;
    const teacherid = req.session.teacherid;

    const { assessmentTitle, assessmenttype, quarterperiod, dateGiven, studentID, grade, total } = req.body;

    const dateObject = new Date(dateGiven);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = dateObject.toLocaleDateString(undefined, options);

    // Ensure that the arrays have the same length
    if (!Array.isArray(studentID) || !Array.isArray(grade) || studentID.length !== grade.length) {

        studentID = [studentID];
        grade = [grade];
        // Handle the error (e.g., return an error response)
        return res.status(400).send('Mismatched data');
    }

    const connection = mysql.createConnection(conn);

    // Loop through the data and insert assessments for each student
    for (let i = 0; i < studentID.length; i++) {
        if (grade[i] === '' || grade[i] === null) {
            // Skip this iteration of the loop if grade is 'NULL' or null
            continue;
        }

        // If grade is not 'NULL' or null, proceed to insert data
        const sql = `INSERT INTO assessments (assessmentTitle, assessmenttype, quarterperiod, dateGiven, studentID, sectionname, subjectname, teacherid, grade, total) VALUES (?,?,?,?,?,?,?,?,?,?)`;
        const values = [assessmentTitle, assessmenttype, quarterperiod, formattedDate, studentID[i], sectionname, subjectname, teacherid, grade[i], total];

        connection.query(sql, values, (err, results) => {
            if (err) {
                console.error('Error inserting assessment:', err);
                // Handle the error (e.g., return an error response)
                return res.status(500).send('Internal Server Error');
            }
        });
    }

    // Close the database connection after all insertions are complete
    connection.end();

    // Redirect to another page after successful insertion
    res.redirect('/teacher/create/grades');
};

