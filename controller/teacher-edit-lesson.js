const mysql = require("mysql");

require('dotenv').config();

const conn = {
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
};

exports.getEditLesson = (req, res) => {
    const connection = mysql.createConnection(conn);
    const { id } = req.params;
    const teacherid = req.session.teacherid;
    const subjectname = req.session.subjectname;
    const sectionname = req.session.sectionname;

    const sql = `SELECT * FROM lessons WHERE id = ? AND subjectname = ? AND sectionname = ? AND teacherid = ?;`;

    const values = [id, subjectname, sectionname, teacherid];

    connection.query(sql, values, (err, results) => {
        if (err) {
            console.error('Error fetching lesson:', err);
            connection.end();
            res.status(500).send('Internal Server Error');
        } else {
            if (results.length === 0) {
                // Handle the case where no lesson is found with the given criteria
                connection.end();
                res.status(404).send('Lesson not found');
            } else {
                const lessonData = results[0]; // Retrieve the first result

                // Render the 'teacher-edit-lesson' template and pass the lesson data
                res.render('teacher-edit-lesson', { lesson: lessonData, teacherid: req.session.teacherid });

                // Close the database connection
                connection.end();
            }
        }
    });
};
exports.postEditLesson = (req, res) => {
    const connection = mysql.createConnection(conn);

    const {id} = req.params;
    const {lessonID, lessonTitle, quarterperiod, section1, section2, section3, section4, section5, section6, section7, section8, section9, section10, visibility} = req.body;


    const teacherid = req.session.teacherid;
    const subjectname = req.session.subjectname;
    const sectionname = req.session.sectionname;
    const dateCreated = new Date();
    const formattedDate = formatCustomDateTime(dateCreated);
    const updatedDate = formattedDate;

    const sql = `
    UPDATE lessons 
    SET
    lessonID = ?,
    lessonTitle = ?,
    subjectname = ?,
    teacherid = ?,
    quarterperiod = ?,
    sectionname = ?,
    section1 = ?,
    section2 = ?,
    section3 = ?,
    section4 = ?,
    section5 = ?,
    section6 = ?,
    section7 = ?,
    section8 = ?,
    section9 = ?,
    section10 = ?,
    dateUpdated = ?,
    visibility = ?
    WHERE id =?;

    `;

    const values = [lessonID,lessonTitle,subjectname,teacherid,quarterperiod,sectionname,section1,section2,section3,section4,section5,section6, section7, section8, section9, section10, updatedDate, visibility, id];

    connection.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error updating lesson:', err);
            connection.end();
            res.status(500).send('Internal Server Error');
        } else {
            req.flash('success1', 'You can proceed');
            // Successfully updated the lesson
            res.redirect('/teacher/lesson/modules'); // Redirect to a success page
        }
    });
}

function formatCustomDateTime(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const milliseconds = String(date.getMilliseconds()).padStart(3, '0');
  
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
  }