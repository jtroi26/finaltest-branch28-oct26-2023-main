const mysql = require("mysql");

require('dotenv').config();

const conn = {
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
};

exports.getSubjectCreatePage = (req, res) => {
    const sectionSql = `SELECT sectionname FROM sections WHERE visibility = 'Visible'`;
    const teacherSql = `SELECT teacherid, firstname, middlename, lastname FROM teacherdetails WHERE visibility = 'Visible';`;

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
        ])
            .then(() => {
                connection.end(); // Close the database connection

                // Pass the data to your EJS template and render it
                res.render('admin-create-subject', { data });
            })
            .catch((err) => {
                console.error('Error:', err);
                res.status(500).send('Internal Server Error');
            });
    });
};

exports.postSubjectCreatePage = (req, res) => {
    const { subjectid, subjectname, sectionname, teacherid , visibility} = req.body;

    // console.log(subjectid);
    // console.log(subjectname);
    // console.log(sectionname);
    // console.log(teacherid);
    // console.log(visibility);

    const sql = `INSERT INTO subjects (subjectid, subjectname, sectionname, teacherid, visibility) VALUES (?, ?, ?, ?, ?);`;
    const values = [subjectid, subjectname, sectionname, teacherid, visibility];

    const connection = mysql.createConnection(conn);

    connection.connect((err) => {
        if (err) {
            console.error('Error connecting to the database:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        connection.query(sql, values, (err, result) => {
            connection.end();

            if (err) {
                console.error('Error executing SQL query:', err);
                res.status(500).send('Internal Server Error');
                return;
            }

            // console output if subject is added successfully

            console.log('Subject Added');
            console.log('subjectID: ' + subjectid);
            console.log('subjectName: ' + subjectname);
            console.log('Section: ' + sectionname); 
            console.log('Teacher: ' + teacherid);
            console.log('Visibility: ' + visibility);

            // Redirect to the subject index URL ('/admin/index-subject')
            res.redirect('/admin/index-subject');
        });
    });
}
