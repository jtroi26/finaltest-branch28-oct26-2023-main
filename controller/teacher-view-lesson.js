const mysql = require("mysql");

require('dotenv').config();

const conn = {
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
};

exports.getLessonPageView = (req, res) => {
    const { id } = req.params;
    const subjectname = req.session.subjectname;
    const sectionname = req.session.sectionname;
    const teacherid = req.session.teacherid;

    const sql = `SELECT * FROM lessons WHERE id = ? AND sectionname = ? AND subjectname = ? AND teacherid = ?;`;

    const values = [id, sectionname, subjectname, teacherid];

    // Create a database connection
    const connection = mysql.createConnection(conn);

    connection.query(sql, values, (err, results) => {
        if (err) {
            console.error('Error fetching lesson:', err);
            connection.end();
            res.status(500).send('Internal Server Error');
        } else {
            if (results.length === 0) {
                // No lesson found with the given criteria, handle this case
                connection.end();
                res.status(404).send('Lesson not found');
            } else {
                // Lesson data is available in 'results[0]'
                const lessonData = results[0];
                console.log(lessonData);
                // Render the 'teacher-view-lesson' template and pass the lesson data
                res.render('teacher-view-lesson', { lesson: lessonData, teacherid: req.session.teacherid });
                // res.render('teacher-view-lesson', { lesson: lessonData });
                // Close the database connection
                connection.end();
            }
        }
    });
}
