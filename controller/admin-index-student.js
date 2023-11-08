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
        firstname,
        middlename,
        lastname,
        CONCAT(firstname, ' ', middlename, ' ', lastname, 
          CASE WHEN suffix = 'none' THEN ' ' ELSE suffix END
        ) AS 'Student Name',
        sectionname,
        dateEnrolled,
        status
      FROM students
      ORDER BY studentID DESC, status ASC
    `;
    const sql2 = `SELECT * FROM sections;`;
    const connection = mysql.createConnection(conn);
  
    // connection.query(sql, (error, results) => {
    //   if (error) {
    //     // Handle the error
    //     console.error(error);
    //   } else {
    //     // Render the EJS template and pass the results
    //     res.render('admin-index-student', { data: results, admin_id: req.session.admin_id });
    //     console.log(results);
    //   }
    //   connection.end(); // Close the MySQL connection when done
    // });
    connection.query(sql, (err, results) => {
      if (err) {
          console.error('Error:', err);
          connection.end(); // Close the database connection in case of an error
          res.status(500).send('Internal Server Error');
          return;
      }

      // Execute the teachersql query
      connection.query(sql, (err, results) => {
          if (err) {
              console.error('Error:', err);
              connection.end(); // Close the database connection in case of an error
              res.status(500).send('Internal Server Error');
              return;
          }
          connection.query(sql2, (err, sectionResults) => {
              if (err) {
                  console.error('Error:', err);
                  connection.end(); // Close the database connection in case of an error
                  res.status(500).send('Internal Server Error');
                  return;
              }

              connection.end(); // Close the database connection

              // Pass the data to your EJS template and render it
              res.render('admin-index-student', { data: results, section:sectionResults, admin_id: req.session.admin_id });

          });
      });
  });
  };

  
    