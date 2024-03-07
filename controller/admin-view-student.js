const mysql = require("mysql");

require('dotenv').config();

const conn = {
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
};

exports.getViewStudent = (req, res) => {
    const connection = mysql.createConnection(conn);
    const { id } = req.params;
  
    const sql = `
      SELECT
        studentID,
        CONCAT(firstname, ' ', middlename, ' ', lastname,
        CASE WHEN suffix = 'none' THEN ' ' ELSE suffix END
        ) AS 'Student Name',
        sectionname,
        dateEnrolled,
        status
      FROM students
      WHERE id = ?;
    `;
  
    connection.query(sql, [id], (error, results) => {
      if (error) {
        // Handle the error
        console.error(error);
      } else {
        // Render the EJS template and pass the results
        res.render('admin-view-student', { student: results[0] }); // Assuming the query returns a single student record
      }
      connection.end(); // Close the MySQL connection when done
    });
  };
  