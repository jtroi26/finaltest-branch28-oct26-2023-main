const mysql = require("mysql");

require('dotenv').config();

const conn = {
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
};

exports.getLessonCreatePage = (req, res) => {
    const connection = mysql.createConnection(conn);
    const subjectid = req.session.subjectid;
    const subjectname = req.session.subjectname;
    const sectionname = req.session.sectionname;
    

   res.render('teacher-create-lesson', {subjectid, subjectname, sectionname, teacherid: req.session.teacherid});
};

exports.postLessonCreatePage= (req, res) => {
    const connection = mysql.createConnection(conn);
    const {lessonID, lessonTitle, quarterperiod, section1, section2, section3, section4, section5, section6, section7, section8, section9, section10, visibility} = req.body;
    const teacherid = req.session.teacherid;
    const subjectname = req.session.subjectname;
    const sectionname = req.session.sectionname;
    const dateCreated = new Date();
    const formattedDate = formatCustomDateTime(dateCreated);
    const updatedDate = formattedDate;

    const sql = `
    INSERT INTO lessons 
    (lessonID, lessonTitle, subjectname, teacherid, quarterperiod, sectionname, section1, section2, section3, section4, section5, section6, section7, section8, section9, section10, dateCreated, dateUpdated, visibility) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

    const values = [lessonID, lessonTitle, subjectname, teacherid, quarterperiod, sectionname, section1, section2, section3, section4, section5, section6, section7, section8, section9, section10, formattedDate, updatedDate,visibility];

    connection.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error creating lesson:', err);
            // Handle the error (e.g., send an error response)
            res.status(500).send('Internal Server Error');
        } else {
            // Successfully inserted the new section
            // You can redirect to a success page or perform other actions
            req.flash('success', 'You can proceed');
            res.redirect('/teacher/lesson/modules');
        }

        // Close the database connection
        connection.end();
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
  
