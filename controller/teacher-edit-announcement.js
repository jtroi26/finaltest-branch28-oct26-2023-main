const mysql = require("mysql");

require('dotenv').config();

const conn = {
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
};

exports.getEditAnnouncementForm = (req, res) => {
    const { id } = req.params;

    const sql = `SELECT * FROM teacherannouncements WHERE id = ?;`;
    const values = [id];

    const connection = mysql.createConnection(conn);

    connection.query(sql, values, (err, results) => {
        if (err) {
            console.error('Error fetching announcement:', err);
            connection.end();
            res.status(500).send('Internal Server Error');
        } else {
            if (results.length === 0) {
                // Handle the case when no announcement is found with the given ID
                connection.end();
                res.status(404).send('Announcement not found');
            } else {
                // Announcement data is available in 'results[0]'
                const announcementData = results[0];
                console.log(announcementData);
                // Render the 'teacher-edit-announcement' template and pass the announcement data
                res.render('teacher-edit-announcement', { announcement: announcementData, teacherid: req.session.teacherid });

                // Close the database connection
                connection.end();
            }
        }
    });
};

exports.postEditAnnouncementForm = (req, res) => {
    const connection = mysql.createConnection(conn);
    const { id } = req.params;
    const { announcementTitle, announcement, visibility } = req.body;

    const dateCreated = new Date();
    const formattedDate = formatCustomDateTime(dateCreated);
    const updatedDate = formattedDate;

    const sql = `
    UPDATE teacherannouncements
    SET
    announcementTitle = ?,
    announcement = ?,
    visibility = ?,
    dateUpdated = ?
    WHERE id = ?;
    `;

    const values = [announcementTitle, announcement, visibility, updatedDate, id];

    connection.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error updating announcement:', err);
            res.status(500).send('Internal Server Error');
        } else {
            // Successfully updated the announcement
            res.redirect('/teacher/announcement');
        }

        // Close the database connection
        connection.end();
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

