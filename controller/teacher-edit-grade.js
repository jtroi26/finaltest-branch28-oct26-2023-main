const mysql = require("mysql");

require('dotenv').config();

const conn = {
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
};

exports.getEditGrade = (req, res) => {
    const { id } = req.params;

    const sql = `SELECT assessmenttype, grade, total FROM assessments WHERE id = ?`;

    const connection = mysql.createConnection(conn);

    connection.query(sql, [id], (error, results) => {
        if (error) {
            throw error;
        }
        console.log(results);
        // Close the connection after handling the results
        connection.end();
        req.session.assessmenttype = results[0].assessmenttype;
        console.log(req.session.assessmenttype);
        // Assuming you want to pass the results to the 'teacher-edit-grade' template
        res.render('teacher-edit-grade', { id, grade: results[0].grade, total: results[0].total });
    });
};

exports.postEditGrade = (req, res) => {
    const { id } = req.params;
    const { grade, total } = req.body;

    const sql = `UPDATE assessments SET grade = ?, total = ? WHERE id = ?;`;
    const values = [grade, total, id];
    const assessmenttype = req.session.assessmenttype;
    const connection = mysql.createConnection(conn);

    connection.query(sql, values, (error, results) => {
        if (error) {
            throw error;
        }

        // Close the connection after executing the update
        connection.end();

        // Assuming you want to redirect to a page after the update
        res.redirect(`/teacher/view/grades/${assessmenttype}`);
    });
};
