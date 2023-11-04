const mysql = require("mysql");

const conn = {
    host: 'localhost',
    database: 'finalcapstone',
    user: 'root',
    password: ''
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
  