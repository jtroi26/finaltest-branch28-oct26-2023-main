const mysql = require("mysql");

require('dotenv').config();

const conn = {
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
};

exports.getAnnouncementPageView = (req, res) => {
    const connection = mysql.createConnection(conn);
    const { id } = req.params;

    const sql = `SELECT * FROM teacherannouncements WHERE id = ?;`;
    const values = [id];

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

                
                // Render the 'teacher-view-announcement' template and pass the announcement data
                res.render('teacher-view-announcement', { announcement: announcementData, teacherid: req.session.teacherid });
                console.log('ANNOUNCEMENT DATA: ' + announcementData);
                // Close the database connection
                connection.end();
            }
        }
    });
};
