const mysql = require("mysql");

const conn = {
    host: 'localhost',
    database: 'finalcapstone',
    user: 'root',
    password: ''
};

exports.getIndexStudents = (req, res) => {
    const sql = `
      SELECT
        id,
        studentID,
        CONCAT(firstname, ' ', middlename, ' ', lastname, 
          CASE WHEN suffix = 'none' THEN ' ' ELSE suffix END
        ) AS 'Student Name',
        sectionname,
        dateEnrolled,
        status
      FROM students
      ORDER BY studentID DESC, status ASC
    `;
  
    const connection = mysql.createConnection(conn);
  
    connection.query(sql, (error, results) => {
      if (error) {
        // Handle the error
        console.error(error);
      } else {
        // Render the EJS template and pass the results
        res.render('admin-index-student', { data: results, admin_id: req.session.admin_id });
        console.log(results);
      }
      connection.end(); // Close the MySQL connection when done
    });
  };
  exports.getIndexStudents = (req, res) => {
    const sql = `
      SELECT
        id,
        studentID,
        CONCAT(firstname, ' ', middlename, ' ', lastname, 
          CASE WHEN suffix = 'none' THEN ' ' ELSE suffix END
        ) AS 'Student Name',
        sectionname,
        dateEnrolled,
        status
      FROM students
      ORDER BY studentID DESC, status ASC
    `;
  
    const connection = mysql.createConnection(conn);
  
    connection.query(sql, (error, results) => {
      if (error) {
        // Handle the error
        console.error(error);
      } else {
        // Render the EJS template and pass the results
        res.render('admin-index-student', { data: results, admin_id: req.session.admin_id });
        console.log(results);
      }
      connection.end(); // Close the MySQL connection when done
    });
  };
  exports.getIndexStudents = (req, res) => {
    const sql = `
      SELECT
        id,
        studentID,
        CONCAT(firstname, ' ', middlename, ' ', lastname, 
          CASE 
            WHEN suffix = 'none' THEN '' 
            ELSE CONCAT(' ', suffix)
          END
        ) AS 'Student Name',
        sectionname,
        dateEnrolled,
        status
      FROM students
      ORDER BY studentID DESC, status ASC
    `;
  
    const connection = mysql.createConnection(conn);
  
    connection.query(sql, (error, results) => {
      if (error) {
        // Handle the error
        console.error(error);
      } else {
        // Render the EJS template and pass the results
        res.render('admin-index-student', { data: results, admin_id: req.session.admin_id });
        console.log(results);
      }
      connection.end(); // Close the MySQL connection when done
    });
  };
  
    