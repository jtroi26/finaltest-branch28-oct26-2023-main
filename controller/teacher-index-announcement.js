const mysql = require("mysql");

const conn = {
    host: 'localhost',
    database: 'finalcapstone',
    user: 'root',
    password: ''
};

exports.getAnnouncementIndexPage = (req, res) => {
    const connection = mysql.createConnection(conn);

    const sql = `SELECT * FROM teacherannouncements WHERE teacherid = ? AND subjectname = ? AND sectionname = ? ORDER BY dateCreated DESC;`;
    const values = [req.session.teacherid, req.session.subjectname, req.session.sectionname];

    connection.query(sql, values, (err, results) => {
        if (err) {
            console.error('Error fetching announcements:', err);
            connection.end();
            res.status(500).send('Internal Server Error');
        } else {
            // Successfully fetched announcements, you can now pass them to your view
            const announcements = results;
            res.render('teacher-index-announcement', { announcements , subjectname:req.session.subjectname,sectionname: req.session.sectionname, teacherid: req.session.teacherid});
            console.log(announcements);
            connection.end(); // Close the database connection
        }
    });
};
