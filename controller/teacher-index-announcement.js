const mysql = require("mysql");

const conn = {
    host: 'localhost',
    database: 'finalcapstone',
    user: 'root',
    password: ''
};

exports.getAnnouncementIndexPage = (req, res) => {
    const connection = mysql.createConnection(conn);

    const sql = `SELECT announcementTitle, announcement, dateCreated FROM teacherannouncements WHERE teacherid = ? AND subjectname = ? AND sectionname = ? ORDER BY dateCreated DESC;`;
    const values = [req.session.teacherid, req.session.subjectname, req.session.sectionname];

    // Set the timezone
    process.env.TZ = 'UTC';

    connection.query(sql, values, (err, results) => {
        if (err) {
            console.error('Error fetching announcements:', err);
            connection.end();
            res.status(500).send('Internal Server Error');
        } else {
            // Successfully fetched announcements, you can now pass them to your view
            results = results.map(result => {
                result.dateCreated = new Date(result.dateCreated).toLocaleDateString('en-US', {
                    year: '2-digit',
                    month: '2-digit',
                    day: '2-digit'
                });
                return result;
            });

            res.render('teacher-index-announcement', {
                announcements: results,
                subjectname: req.session.subjectname,
                sectionname: req.session.sectionname,
                teacherid: req.session.teacherid
            });

            console.log(results);
            connection.end(); // Close the database connection
        }
    });
};
