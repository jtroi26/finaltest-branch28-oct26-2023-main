const mysql = require("mysql");

const conn = {
    host: 'localhost',
    database: 'finalcapstone',
    user: 'root',
    password: ''
};
exports.getSubjectOverview = (req, res) => {
    const { id } = req.params;
    const sql = `SELECT id, overview FROM subjectoverview WHERE id = ?`;

    const connection = mysql.createConnection(conn);

    connection.query(sql, [id], (error, results) => {
        if (error) {
            console.error('Error executing MySQL query:', error);
            res.status(500).send('Internal Server Error');
            return;
        }

        if (results.length === 0) {
            res.status(404).send('Subject overview not found');
            return;
        }

        // Assuming 'overview' is a column in your database results
        const overview = results[0].overview;
        console.log(overview);

        // Render the template with the fetched overview
        res.render('teacher-edit-subject-overview', { id, overview , teacherid: req.session.teacherid});
    });

    connection.end();
};


exports.postSubjectOverview = (req, res) => {
    const { id } = req.params;
    const { overview } = req.body;

    const sql = `UPDATE subjectoverview SET overview = ? WHERE id = ?;`;
    const values = [overview, id];

    const connection = mysql.createConnection(conn);

    connection.query(sql, values, (error, results) => {
        if (error) {
            console.error('Error executing MySQL query:', error);
            res.status(500).send('Internal Server Error');
            return;
        }

        console.log('Subject overview updated successfully');
        connection.end(); // Close the MySQL connection

        // Redirect to a relevant page after the update
        res.redirect('/teacher/subjectoverview');
    });
};
