const mysql = require("mysql");

const conn = {
    host: 'localhost',
    database: 'finalcapstone',
    user: 'root',
    password: ''
};

// exports.getSubjectModules = (req, res) => {
//     const connection = mysql.createConnection(conn);
//     const subjectid = req.session.subjectid;
//     const subjectname = req.session.subjectname;
//     const sectionname = req.session.sectionname;

//     const values = [sectionname, subjectname];


//     const firstquartersql = `SELECT id, lessonID, lessonTitle, sectionname, subjectname FROM lessons WHERE quarterperiod = 'First QUARTER' AND sectionname = '?' AND subjectname = '?';`
//     const secondquartersql = `SELECT id, lessonID, lessonTitle FROM lessons WHERE quarterperiod = 'Second Quarter AND sectionname = '?' AND subjectname = '?';`
//     const thirdquartersql = `SELECT id, lessonID, lessonTitle FROM lessons WHERE quarterperiod = 'Third Quarter AND sectionname = '?' AND subjectname = '?';`
//     const fourthquartersql = `SELECT id, lessonID, lessonTitle FROM lessons WHERE quarterperiod = 'Fourth Quarter AND sectionname = '?' AND subjectname = '?';`
    
//     res.render('teacher-lesson-modules',{ subjectid, subjectname, sectionname});
// };

exports.getSubjectModules = (req, res) => {
    const connection = mysql.createConnection(conn);
    const subjectid = req.session.subjectid;
    const subjectname = req.session.subjectname;
    const sectionname = req.session.sectionname;

    const values = [sectionname, subjectname];

    const firstquartersql = `SELECT id, lessonID, lessonTitle, sectionname, subjectname FROM lessons WHERE quarterperiod = 'First Quarter' AND sectionname = ? AND subjectname = ?`;
    const secondquartersql = `SELECT id, lessonID, lessonTitle, sectionname, subjectname FROM lessons WHERE quarterperiod = 'Second Quarter' AND sectionname = ? AND subjectname = ?`;
    const thirdquartersql = `SELECT id, lessonID, lessonTitle, sectionname, subjectname FROM lessons WHERE quarterperiod = 'Third Quarter' AND sectionname = ? AND subjectname = ?`;
    const fourthquartersql = `SELECT id, lessonID, lessonTitle, sectionname, subjectname FROM lessons WHERE quarterperiod = 'Fourth Quarter' AND sectionname = ? AND subjectname = ?`;

    const renderData = {
        subjectid,
        subjectname,
        sectionname,
    };

    connection.query(firstquartersql, values, (err, firstQuarterResults) => {
        if (err) {
            console.error('Error fetching first quarter lessons:', err);
            // Handle the error (e.g., send an error response)
            res.status(500).send('Internal Server Error');
        } else if (firstQuarterResults.length === 0) {
            renderData.firstQuarterMessage = 'No lesson was created for the first quarter.';
            renderSecondQuarter();
        } else {
            renderData.firstQuarterLessons = firstQuarterResults;
            renderSecondQuarter();
        }
    });

    function renderSecondQuarter() {
        connection.query(secondquartersql, values, (err, secondQuarterResults) => {
            if (err) {
                console.error('Error fetching second quarter lessons:', err);
                // Handle the error (e.g., send an error response)
                res.status(500).send('Internal Server Error');
            } else if (secondQuarterResults.length === 0) {
                renderData.secondQuarterMessage = 'No lesson was created for the second quarter.';
                renderThirdQuarter();
            } else {
                renderData.secondQuarterLessons = secondQuarterResults;
                renderThirdQuarter();
            }
        });
    }

    function renderThirdQuarter() {
        connection.query(thirdquartersql, values, (err, thirdQuarterResults) => {
            if (err) {
                console.error('Error fetching third quarter lessons:', err);
                // Handle the error (e.g., send an error response)
                res.status(500).send('Internal Server Error');
            } else if (thirdQuarterResults.length === 0) {
                renderData.thirdQuarterMessage = 'No lesson was created for the third quarter.';
                renderFourthQuarter();
            } else {
                renderData.thirdQuarterLessons = thirdQuarterResults;
                renderFourthQuarter();
            }
        });
    }

    function renderFourthQuarter() {
        connection.query(fourthquartersql, values, (err, fourthQuarterResults) => {
            if (err) {
                console.error('Error fetching fourth quarter lessons:', err);
                // Handle the error (e.g., send an error response)
                res.status(500).send('Internal Server Error');
            } else if (fourthQuarterResults.length === 0) {
                renderData.fourthQuarterMessage = 'No lesson was created for the fourth quarter.';
            } else {
                renderData.fourthQuarterLessons = fourthQuarterResults;
            }

            // Close the database connection
            connection.end((err) => {
                if (err) {
                    console.error('Error closing the database connection:', err);
                }
            });

            res.render('teacher-lesson-modules', renderData);
        });
    }
};
