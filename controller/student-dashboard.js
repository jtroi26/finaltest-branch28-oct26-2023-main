const mysql = require("mysql");

const conn = {
    host: 'localhost',
    database: 'finalcapstone',
    user: 'root',
    password: ''
};

exports.getStudentDashboard = (req, res) => {
    const studentfullname = req.session.studentfirstname + ' ' + req.session.studentmiddlename + ' ' + req.session.studentlastname + ' ' + req.session.suffix;

    const connection = mysql.createConnection(conn);
    const sql = `SELECT students.studentID, 
    CONCAT(students.firstname, ' ', students.middlename, ' ', students.lastname, ' ', students.suffix) AS full_name,
    students.sectionname, 
    subjects.id,
    subjects.subjectid, 
    subjects.subjectname, 
    subjects.teacherid
    FROM students
    INNER JOIN subjects
    ON subjects.sectionname = students.sectionname
    WHERE students.studentID = ? AND students.sectionname = ? AND subjects.visibility = 'Visible'`;

    const sqlannouncement = `SELECT id, teacherid, subjectname, sectionname, announcementTitle, announcement, visibility, dateCreated from teacherannouncements WHERE  sectionname = ? ORDER BY dateCreated DESC LIMIT 5`
    
    const studentid = req.session.studentID;
    const sectionname = req.session.sectionname;
    const announcementvalues = [sectionname];
    const values = [studentid, sectionname];

    connection.query(sql, values, (error, studentResults) => {
        if (error) {
            console.error(error);
            connection.end();
            res.status(500).send('Internal Server Error');
        } else {
            connection.query(sqlannouncement, announcementvalues, (announcementError, announcementResults) => {
                if (announcementError) {
                    console.error(announcementError);
                    connection.end();
                    res.status(500).send('Internal Server Error');
                } else {
                    // Modify the date format in announcementResults
                    announcementResults = announcementResults.map(result => {
                        return {
                            ...result,
                            dateCreated: new Date(result.dateCreated).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            }),
                        };
                    });

                    console.log(studentResults);
                    console.log(announcementResults);
                    res.render('student-dashboard', {
                        studentfullname,
                        studentfirstname: req.session.studentfirstname,
                        studentid,
                        studentData: studentResults,
                        announcementData: announcementResults,
                    });

                    connection.end();
                }
            });
        }
    });
};

