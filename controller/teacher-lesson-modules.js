const mysql = require("mysql");

require('dotenv').config();

const conn = {
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
};

// exports.getSubjectModules = (req, res) => {
//     const connection = mysql.createConnection(conn);
//     const subjectid = req.session.subjectid;
//     const subjectname = req.session.subjectname;
//     const sectionname = req.session.sectionname;




//     const firstquartersql = `SELECT id, lessonID, lessonTitle, sectionname, subjectname FROM lessons WHERE quarterperiod = 'First QUARTER' AND sectionname = '?' AND subjectname = '?' ORDER BY lessonID ASC;`
//     const secondquartersql = `SELECT id, lessonID, lessonTitle FROM lessons WHERE quarterperiod = 'Second Quarter' AND sectionname = '?' AND subjectname = '?' ORDER BY lessonID ASC;`
//     const thirdquartersql = `SELECT id, lessonID, lessonTitle FROM lessons WHERE quarterperiod = 'Third Quarter' AND sectionname = '?' AND subjectname = '?' ORDER BY lessonID ASC;`
//     const fourthquartersql = `SELECT id, lessonID, lessonTitle FROM lessons WHERE quarterperiod = 'Fourth Quarter' AND sectionname = '?' AND subjectname = '?' ORDER BY lessonID ASC;`
    
//     res.render('teacher-lesson-modules',{ subjectid, subjectname, sectionname});
// };

exports.getSubjectModules = (req, res) => {
    const connection = mysql.createConnection(conn);
    const subjectid = req.session.subjectid;
    const subjectname = req.session.subjectname;
    const sectionname = req.session.sectionname;
    const teacherid = req.session.teacherid;

    // Define placeholders for sectionname and subjectname
    const values = [sectionname, subjectname];

    const firstquartersql = `SELECT id, lessonID, lessonTitle, quarterperiod, subjectname FROM lessons WHERE quarterperiod = 'First Quarter' AND sectionname = ? AND subjectname = ?  AND Visibility = 'Visible'  AND Visibility = 'Visible' ORDER BY lessonID ASC;`
    const secondquartersql = `SELECT id, lessonID, lessonTitle, quarterperiod, subjectname FROM lessons WHERE quarterperiod = 'Second Quarter' AND sectionname = ? AND subjectname = ? AND Visibility = 'Visible' AND Visibility = 'Visible' ORDER BY lessonID ASC;`
    const thirdquartersql = `SELECT id, lessonID, lessonTitle, quarterperiod, subjectname FROM lessons WHERE quarterperiod = 'Third Quarter' AND sectionname = ? AND subjectname = ? AND Visibility = 'Visible' AND Visibility = 'Visible' ORDER BY lessonID ASC;`
    const fourthquartersql = `SELECT id, lessonID, lessonTitle, quarterperiod, subjectname FROM lessons WHERE quarterperiod = 'Fourth Quarter' AND sectionname = ? AND subjectname = ? AND Visibility = 'Visible' AND Visibility = 'Visible' ORDER BY lessonID ASC;`
    // Execute SQL queries
    connection.query(firstquartersql, values, (err, firstQuarterResults) => {
        if (err) {
            console.error('Error fetching first quarter lessons:', err);
            connection.end();
            res.status(500).send('Internal Server Error');
        } else {
            connection.query(secondquartersql, values, (err, secondQuarterResults) => {
                if (err) {
                    console.error('Error fetching second quarter lessons:', err);
                    connection.end();
                    res.status(500).send('Internal Server Error');
                } else {
                    connection.query(thirdquartersql, values, (err, thirdQuarterResults) => {
                        if (err) {
                            console.error('Error fetching third quarter lessons:', err);
                            connection.end();
                            res.status(500).send('Internal Server Error');
                        } else {
                            connection.query(fourthquartersql, values, (err, fourthQuarterResults) => {
                                connection.end(); // Close the database connection
                                if (err) {
                                    console.error('Error fetching fourth quarter lessons:', err);
                                    res.status(500).send('Internal Server Error');
                                } else {
                                    res.render('teacher-lesson-modules', {
                                        subjectid,
                                        subjectname,
                                        sectionname,
                                        teacherid,
                                        
                                        firstQuarterLessons: firstQuarterResults,
                                        secondQuarterLessons: secondQuarterResults,
                                        thirdQuarterLessons: thirdQuarterResults,
                                        fourthQuarterLessons: fourthQuarterResults,
                                        
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });
};

