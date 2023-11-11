const mysql = require("mysql");

const conn = {
    host: 'localhost',
    database: 'finalcapstone',
    user: 'root',
    password: ''
};

exports.getLessonPage = (req, res) => {
    const { id } = req.params;

    const studentid = req.session.studentID;
    const sql = `SELECT * FROM lessons WHERE id = ?;`;
    const connection = mysql.createConnection(conn); // Create a new connection
    connection.query(sql, id, (err, results) => {
        if (err) {
            console.error('Error fetching lesson data:', err);
            connection.end(); // Close the database connection in case of an error
            res.status(500).send('Internal Server Error');
        } else {
            if (results.length === 1) {
                // Successfully fetched the lesson data
                // Pass the single result (row) to the template
                res.render('student-view-lesson', { lessonData: results[0] , studentid: studentid});
            } else {
                res.status(404).send('Lesson not found'); // Handle the case where no or multiple rows are found
            }

            connection.end(); // Close the database connection after rendering the template or sending an error response
        }
    });
};
