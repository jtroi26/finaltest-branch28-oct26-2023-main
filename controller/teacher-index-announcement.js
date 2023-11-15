const mysql = require("mysql");

const conn = {
    host: 'localhost',
    database: 'finalcapstone',
    user: 'root',
    password: ''
};

exports.getAnnouncementIndexPage = (req, res) => {
    const connection = mysql.createConnection(conn);

    const sql = `SELECT *, DATE_FORMAT(STR_TO_DATE(dateCreated, '%a %b %d %Y %T GMT%z (%Z)'), '%m-%d-%y') as formattedDate 
                 FROM teacherannouncements 
                 WHERE teacherid = ? AND subjectname = ? AND sectionname = ? 
                 ORDER BY dateCreated DESC;`;
    const values = [req.session.teacherid, req.session.subjectname, req.session.sectionname];

    // connection.query(sql, values, (err, results) => {
    //     if (err) {
    //         console.error('Error fetching announcements:', err);
    //         connection.end();
    //         res.status(500).send('Internal Server Error');
    //     } else {
    //         res.render('teacher-index-announcement', {
    //             announcements: results,
    //             subjectname: req.session.subjectname,
    //             sectionname: req.session.sectionname,
    //             teacherid: req.session.teacherid
    //         });

    //         console.log(results);
    //         connection.end(); // Close the database connection
    //     }
    // });
    connection.query(sql, values, (err, results) => {
        if (err) {
            console.error('Error fetching announcements:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        // Convert dateCreated to the desired format (MM-DD-YY)
        results = results.map(result => {
            result.dateCreated = new Date(result.dateCreated).toLocaleDateString('en-US', {
                year: '2-digit',
                month: '2-digit',
                day: '2-digit'
            });
            return result;
        });

        console.log(results);
        // Assuming you have a template engine (like EJS) for rendering
        res.render('teacher-index-announcement', {
            announcements: results,
            subjectname: req.session.subjectname,
            sectionname: req.session.sectionname,
            teacherid: req.session.teacherid
        });
    });
};

