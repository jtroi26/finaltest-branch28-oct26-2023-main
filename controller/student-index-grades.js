const mysql = require("mysql");

require('dotenv').config();

const conn = {
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
};

exports.getGradeIndexPage = (req, res) => {
    const sectionname = req.session.sectionname;
    const subjectname = req.session.subjectname;
    const teacherid = req.session.teacherid;
    const studentid = req.session.studentID;

    // Create a connection to the database
    const connection = mysql.createConnection(conn);

    // Function to execute a query and return a promise
    const executeQuery = (sql, values) => {
        return new Promise((resolve, reject) => {
            connection.query(sql, values, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    };

    // Array to store promises for each query
    const promises = [];

    // Define SQL queries
    const sqlQueries = [
        `
            SELECT
                assessments.id, 
                assessments.assessmentTitle, 
                assessments.quarterperiod,
                assessments.dateGiven, 
                assessments.studentID,
                assessments.sectionname, 
                assessments.subjectname, 
                assessments.grade, 
                assessments.total
            FROM 
                assessments
            INNER JOIN assessmenttype
            ON assessmenttype.assessmenttype = assessments.assessmenttype
            WHERE 
                quarterperiod = 'First Quarter' 
                AND studentID = ? 
                AND sectionname = ?
                AND subjectname = ?
                AND teacherid = ?
            ORDER BY assessmenttype.id ASC;
        `,
        `
            SELECT
                assessments.id, 
                assessments.assessmentTitle, 
                assessments.quarterperiod,
                assessments.dateGiven, 
                assessments.studentID,
                assessments.sectionname, 
                assessments.subjectname, 
                assessments.grade, 
                assessments.total
            FROM 
                assessments
            INNER JOIN assessmenttype
            ON assessmenttype.assessmenttype = assessments.assessmenttype
            WHERE 
                quarterperiod = 'Second Quarter' 
                AND studentID = ? 
                AND sectionname = ?
                AND subjectname = ?
                AND teacherid = ?
            ORDER BY assessmenttype.id ASC;
        `,
        `
            SELECT
                assessments.id, 
                assessments.assessmentTitle, 
                assessments.quarterperiod,
                assessments.dateGiven, 
                assessments.studentID,
                assessments.sectionname, 
                assessments.subjectname, 
                assessments.grade, 
                assessments.total
            FROM 
                assessments
            INNER JOIN assessmenttype
            ON assessmenttype.assessmenttype = assessments.assessmenttype
            WHERE 
                quarterperiod = 'Third Quarter' 
                AND studentID = ? 
                AND sectionname = ?
                AND subjectname = ?
                AND teacherid = ?
            ORDER BY assessmenttype.id ASC;
        `,
        `
            SELECT
                assessments.id, 
                assessments.assessmentTitle, 
                assessments.quarterperiod,
                assessments.dateGiven, 
                assessments.studentID,
                assessments.sectionname, 
                assessments.subjectname, 
                assessments.grade, 
                assessments.total
            FROM 
                assessments
            INNER JOIN assessmenttype
            ON assessmenttype.assessmenttype = assessments.assessmenttype
            WHERE 
                quarterperiod = 'Fourth Quarter' 
                AND studentID = ? 
                AND sectionname = ?
                AND subjectname = ?
                AND teacherid = ?
            ORDER BY assessmenttype.id ASC;
        `
        // Add other SQL queries here...
    ];

    // Execute each query and push the promise to the array
    sqlQueries.forEach((sqlQuery) => {
        promises.push(executeQuery(sqlQuery, [studentid, sectionname, subjectname, teacherid]));
    });

    // Use Promise.all to wait for all queries to complete
    Promise.all(promises)
        .then((results) => {
            // Successfully fetched the assessment data
            console.log(results);

            // Pass all results to the template
            res.render('student-index-grades', {
                assessmentData1: results[0],
                assessmentData2: results[1],
                assessmentData3: results[2],
                assessmentData4: results[3],
                studentid
            });

            // Close the database connection after rendering the template
            connection.end();
        })
        .catch((error) => {
            // Handle errors
            console.error('Error fetching assessment data:', error);
            res.status(500).send('Internal Server Error');
            connection.end();
        });
};
