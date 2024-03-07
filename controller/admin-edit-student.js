const mysql = require("mysql");

require('dotenv').config();

const conn = {
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
};

exports.getEditStudent = (req, res) => {
    const connection = mysql.createConnection(conn);
    const { id } = req.params;

    const sql = `SELECT * FROM students WHERE id = ?;`;
    const value1 = id;

    const sql2 = `SELECT * FROM sections;`;

    // Execute the first query to get student data
    connection.query(sql, [id], (error, studentResults) => {
        if (error) {
            // Handle the error
            console.error(error);
        } else {
            const studentData = studentResults[0];

            // Execute the second query to get section data
            connection.query(sql2, (error2, sectionResults) => {
                if (error2) {
                    console.error(error2);
                    // Handle the error for the second query
                } else {
                    const sectionData = sectionResults;
                    // console.log(studentData);
                    // console.log(sectionData);
                    // Render the EJS template and pass both sets of data
                    res.render('admin-edit-student', { student: studentData, sections: sectionData });
                }
            });
        }
    });
};


exports.postEditStudent = (req, res) => {
    const connection = mysql.createConnection(conn);
    const { id } = req.params;
    const { studentID, firstname, middlename, lastname, suffix, sectionname, status } = req.body;

    const sql = `
    UPDATE students
    SET
        studentID = ?,
        firstname = ?,
        middlename = ?,
        lastname = ?,
        suffix = ?,  -- Added '=' here
        sectionname = ?, -- Added '=' here
        status = ?
    WHERE id = ?;
    `;

    const values = [studentID, firstname, middlename, lastname, suffix, sectionname, status, id];

    connection.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error updating student details:', err);
            res.status(500).send('Internal Server Error');
        } else {
            // Successfully updated the student
            res.redirect('/admin/index-student');
        }
        // Close the database connection
        connection.end();
    });
};
