const mysql = require("mysql");

require('dotenv').config();

const conn = {
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
};

exports.getCreateAnnouncementPage = (req, res) => {
    console.log("teacher Session in get create: " + req.session.teacherid);
    res.render('teacher-create-announcement', {teacherid: req.session.teacherid});
};

exports.postCreateAnnouncementPage = (req, res) => {
    const connection = mysql.createConnection(conn);

    const { announcementTitle, announcement, visibility} = req.body;
    console.log('Post Create data')
    console.log(req.body)
    const dateCreated = new Date();
    const formattedDate = formatCustomDateTime(dateCreated);
    const updatedDate = formattedDate;

    const sql = `INSERT INTO teacherannouncements (teacherid, subjectname, sectionname, announcementTitle,announcement, visibility, dateCreated, dateUpdated)
    VALUES (?,?,?,?,?,?,?,?);`;

    const values = [req.session.teacherid, req.session.subjectname, req.session.sectionname, announcementTitle, announcement, visibility, updatedDate, updatedDate];
    
    connection.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error creating announcement:', err);
            connection.end();
            res.status(500).send('Internal Server Error');
        } else {
            // Successfully inserted the announcement
            req.flash('success', 'You can proceed');
            res.redirect('/teacher/announcement/'); // Redirect to a success page or another appropriate action
            connection.end(); // Close the database connection
        }
    });
};



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