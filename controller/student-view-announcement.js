const mysql = require("mysql");

const conn = {
    host: 'localhost',
    database: 'finalcapstone',
    user: 'root',
    password: ''
};

exports.getAnnouncementPage = (req, res) => {
    const connection = mysql.createConnection(conn);

    const studentid = req.session.studentID;
    const subjectname = req.session.subjectname;
    const sectionname = req.session.sectionname;
    const teacherid = req.session.teacherid;

    const sql = `
    SELECT id,
           teacherid,
           announcementTitle,
           announcement,
           dateCreated
    FROM teacherannouncements
    WHERE teacherid = ?
      AND subjectname = ?
      AND sectionname = ?
    ORDER BY dateCreated DESC`;

    connection.query(sql, [teacherid, subjectname, sectionname], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error fetching announcements');
            return;
        }

        const announcements = results.map(result => {
            return {
                ...result,
                dateCreated: new Date(result.dateCreated).toLocaleDateString('en-US', {
                    year: '2-digit',
                    month: '2-digit',
                    day: '2-digit'
                })
            };
        });

        res.render('student-view-announcement', { announcements, studentid });
    });
};
