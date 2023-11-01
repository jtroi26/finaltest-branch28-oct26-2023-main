const mysql = require("mysql");

const conn = {
    host: 'localhost',
    database: 'finalcapstone',
    user: 'root',
    password: ''
};

exports.getSubjectPage = (req, res) => {
    const connection = mysql.createConnection(conn);
    const id = req.params.id; // Assuming 'id' is a route parameter

    const sql = `SELECT subjectid, subjectname, sectionname, visibility FROM subjects WHERE id = ?`;

    connection.query(sql, [id], (error, results) => {
        if (error) {
            console.error('Error executing SQL query:', error);
            connection.end();
            return res.status(500).send('Internal Server Error');
        }
        if (results.length === 1) {
            console.log('Query result:', results);
            
            const sectionname = results[0].sectionname;
            const subjectname = results[0].subjectname;
            const subjectid = results[0].subjectid;

            req.session.sectionname = sectionname;
            req.session.subjectname = subjectname;
            req.session.subjectid = subjectid;

            console.log("sectionname: " + req.session.sectionname);
            console.log("subjectname: " + req.session.subjectname);
            console.log("subjectid: " + req.session.subjectid);

            res.render('teacher-view-subject', {
                sectionname: req.session.sectionname,
                subjectname: req.session.subjectname,
                subjectid: req.session.subjectid
            });
        } else {
            console.error('No or multiple results found');
            res.status(404).send('Subject not found');
        }

        connection.end();
    });
};
