const mysql = require("mysql");

require('dotenv').config();

const conn = {
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
};

exports.getAnnouncement = (req, res) => {
  const { id } = req.params;
  const studentid = req.session.studentID;
  const connection = mysql.createConnection(conn); // Assuming 'conn' is your MySQL connection configuration

  const sql = `
    SELECT
           announcementTitle,
           announcement
    FROM teacherannouncements
    WHERE id = ?;
  `;

  connection.query(sql, [id], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error fetching announcement');
      return;
    }

    // Check if any announcement is found
    if (results.length === 0) {
      res.status(404).send('Announcement not found');
      return;
    }

    const announcement = results[0]; // Get the first (and only) announcement

    // Close the database connection
    connection.end();

    // Render the announcement page with the announcement data
    res.render('student-view-announcementpage', { announcement, studentid });
  });
};

