const mysql = require("mysql");

const conn = {
    host: 'localhost',
    database: 'finalcapstone',
    user: 'root',
    password: ''
};

exports.getAssessmentGrades = (req, res) => {
    const { id } = req.params;

    const sectionname = req.session.sectionname;
    const subjectid = req.session.subjectid;
    const subjectname = req.session.subjectname;
    const teacherid = req.session.teacherid;

    const sqlquarterperiod1 = `
    SELECT
        ass.id,
        ass.assessmentTitle,
        ass.quarterperiod,
        ass.dateGiven,
        ass.studentID,
        ass.sectionname,
        ass.subjectname,
        ass.teacherid,
        ass.grade,
        ass.total,
        CONCAT_WS(' ',
            s.firstname,
            COALESCE(s.middlename, ''),
            s.lastname,
            COALESCE(NULLIF(s.suffix, 'none'), '')
        ) AS full_name
    FROM
        assessments AS ass
    INNER JOIN
        students AS s ON ass.studentID = s.studentID
    WHERE
        ass.teacherid = ? AND ass.sectionname = ? AND ass.subjectname = ? AND ass.quarterperiod = 'First Quarter' and ass.assessmenttype = ?;`;

    const sqlquarterperiod2 = `
    SELECT
        ass.id,
        ass.assessmentTitle,
        ass.quarterperiod,
        ass.dateGiven,
        ass.studentID,
        ass.sectionname,
        ass.subjectname,
        ass.teacherid,
        ass.grade,
        ass.total,
        CONCAT_WS(' ',
            s.firstname,
            COALESCE(s.middlename, ''),
            s.lastname,
            COALESCE(NULLIF(s.suffix, 'none'), '')
        ) AS full_name
    FROM
        assessments AS ass
    INNER JOIN
        students AS s ON ass.studentID = s.studentID
    WHERE
        ass.teacherid = ? AND ass.sectionname = ? AND ass.subjectname = ? AND ass.quarterperiod = 'Second Quarter' and ass.assessmenttype = ?;`;

    const sqlquarterperiod3 = `
    SELECT
        ass.id,
        ass.assessmentTitle,
        ass.quarterperiod,
        ass.dateGiven,
        ass.studentID,
        ass.sectionname,
        ass.subjectname,
        ass.teacherid,
        ass.grade,
        ass.total,
        CONCAT_WS(' ',
            s.firstname,
            COALESCE(s.middlename, ''),
            s.lastname,
            COALESCE(NULLIF(s.suffix, 'none'), '')
        ) AS full_name
    FROM
        assessments AS ass
    INNER JOIN
        students AS s ON ass.studentID = s.studentID
    WHERE
        ass.teacherid = ? AND ass.sectionname = ? AND ass.subjectname = ? AND ass.quarterperiod = 'Third Quarter' and ass.assessmenttype = ?;`;

    const sqlquarterperiod4 = `
    SELECT
        ass.id,
        ass.assessmentTitle,
        ass.quarterperiod,
        ass.dateGiven,
        ass.studentID,
        ass.sectionname,
        ass.subjectname,
        ass.teacherid,
        ass.grade,
        ass.total,
        CONCAT_WS(' ',
            s.firstname,
            COALESCE(s.middlename, ''),
            s.lastname,
            COALESCE(NULLIF(s.suffix, 'none'), '')
        ) AS full_name
    FROM
        assessments AS ass
    INNER JOIN
        students AS s ON ass.studentID = s.studentID
    WHERE
        ass.teacherid = ? AND ass.sectionname = ? AND ass.subjectname = ? AND ass.quarterperiod = 'Fourth Quarter' and ass.assessmenttype = ?;`;

    const values = [teacherid, sectionname, subjectname, id];

    const connection = mysql.createConnection(conn);

    connection.query(sqlquarterperiod1, values, (error, results1) => {
        if (error) {
            throw error;
        }
        console.log(results1);

        connection.query(sqlquarterperiod2, values, (error, results2) => {
            if (error) {
                throw error;
            }
            console.log(results2);

            connection.query(sqlquarterperiod3, values, (error, results3) => {
                if (error) {
                    throw error;
                }
                console.log(results3);

                connection.query(sqlquarterperiod4, values, (error, results4) => {
                    if (error) {
                        throw error;
                    }
                    console.log(results4);

                    // Close the connection after handling the results
                    connection.end();

                    // Combine the results as needed and render the page
                    // const combinedResults = [results1, results2, results3, results4];
                    res.render('teacher-view-grade-per-assessment', { period1:results1, period2:results2, period3:results3, period4:results4 });
                });
            });
        });
    });
};


