const mysql = require("mysql");

const conn = {
    host: 'localhost',
    database: 'finalcapstone',
    user: 'root',
    password: ''
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
    // Your SQL query
    const sql = `INSERT INTO assessments (assessmentTitle, assessmenttype, quarterperiod, dateGiven, studentID, sectionname, subjectname, teacherid, grade, total) VALUES (?,?,?,?,?,?,?,?,?,?)`;

    if (!Array.isArray(studentID)) {
        studentID = [studentID];
        grade = [grade];
    }

    if (studentID.length !== grade.length) {
        return res.status(400).send('Mismatched data');
    }

    const connection = mysql.createConnection(conn);

    for (let i = 0; i < studentID.length; i++) {
        if (grade[i] === 'NULL' || grade[i] === null) {
            // Skip this iteration of the loop if grade is 'NULL' or null
            continue;
        }

        // If grade is not 'NULL' or null, proceed to insert data

        const currentStudentID = studentID[i];
        const currentGrade = grade[i];

        // Create a new set of values for each iteration of the loop
        const currentValues = [assessmentTitle, assessmenttype, quarterperiod, formattedDate, currentStudentID, sectionname, subjectname, teacherid, currentGrade, total];

        connection.query(sql, currentValues, (err, results) => {
            if (err) {
                console.error('Error inserting assessments:', err);
                return res.status(500).send('Internal Server Error');
            }
        });
    }

    connection.end();
    res.redirect('/teacher/create/grades');
};

