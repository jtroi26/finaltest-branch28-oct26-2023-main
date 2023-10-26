const mysql = require("mysql");

const conn = {
    host: 'localhost',
    database: 'finalcapstone',
    user: 'root',
    password: ''
};

exports.getEditSubjectPage = (req, res) => {
    const subjectid = req.params.id; // Get subjectid from request parameters

    const subjectSql = 'SELECT id, subjectid, subjectname FROM subjects WHERE subjectid = ?';
    const sectionSql = 'SELECT sectionname FROM sections';
    const teacherSql = 'SELECT teacherid, firstname, middlename, lastname FROM teacherdetails';

    const connection = mysql.createConnection(conn);

    // Create an object to store the results
    const data = {};

    connection.connect((err) => {
        if (err) {
            console.error('Error connecting to the database:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        // Execute both SQL queries in parallel using Promise.all
        Promise.all([
            new Promise((resolve, reject) => {
                connection.query(sectionSql, (err, sectionResults) => {
                    if (err) {
                        reject(err);
                    } else {
                        data.sections = sectionResults;
                        resolve();
                    }
                });
            }),
            new Promise((resolve, reject) => {
                connection.query(teacherSql, (err, teacherResults) => {
                    if (err) {
                        reject(err);
                    } else {
                        data.teachers = teacherResults;
                        resolve();
                    }
                });
            }),
            new Promise((resolve, reject) => {
                connection.query(subjectSql, [subjectid], (err, subjectResults) => {
                    if (err) {
                        reject(err);
                    } else {
                        data.subject = subjectResults[0]; // Assuming you expect only one record
                        resolve();
                    }
                });
            }),
        ])
            .then(() => {
                connection.end(); // Close the database connection

                // Pass the data to your EJS template and render it
                res.render('admin-edit-subject', { data });
            })
            .catch((err) => {
                console.error('Error:', err);
                res.status(500).send('Internal Server Error');
            });
    });
};

exports.postEditSubjectPage = (req, res) => {
    const connection = mysql.createConnection(conn);

    // Extract the form data submitted by the user
    const { subjectid, subjectname, sectionname, teacherid, visibility } = req.body;
    const { id } = req.params; // Assuming your route parameter is named 'id'

    const sql = `
        UPDATE subjects
        SET
            subjectid = ?,
            subjectname = ?,
            sectionname = ?,
            teacherid = ?,
            visibility = ?
        WHERE id = ?;`;

    const values = [subjectid, subjectname, sectionname, teacherid, visibility, id];

    // Execute the SQL update statement
    connection.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error updating subject:', err);
            res.status(500).send('Internal Server Error');
        } else {
            // Successfully updated the subject
            res.redirect('/admin/index-subject');
        }

        // Close the database connection
        connection.end();
    });
};