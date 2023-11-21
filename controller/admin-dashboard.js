const mysql = require("mysql");

const conn = {
  host: 'localhost',
  database: 'finalcapstone',
  user: 'root',
  password: ''
};

exports.getDashboard = (req, res) => {
    // Creating a MySQL connection
    const connection = mysql.createConnection(conn);
  
    // Connecting to the database
    connection.connect((err) => {
      if (err) {
        console.error('Error connecting to database:', err);
        return;
      }
  
      // Query to retrieve teacher information
      const teachersql = `
        SELECT dept.department, COUNT(td.department) AS department_count
        FROM teacherdetails AS td
        INNER JOIN departments AS dept ON td.department = dept.department
        GROUP BY td.department, dept.department;
      `;
  
      // Query to retrieve student information
      const studentsql = `
        SELECT sections.sectionname, COUNT(students.sectionname) AS students_count
        FROM sections
        LEFT JOIN students ON students.sectionname = sections.sectionname
        GROUP BY sections.sectionname
        ORDER BY sections.id ASC;
      `;
  
      // Executing the SQL queries for both teachers and students
      connection.query(teachersql, (err, teacherResults) => {
        if (err) {
          console.error('Error executing teacher query:', err);
          connection.end(); // Close the database connection in case of an error
          return;
        }
  
        connection.query(studentsql, (err, studentResults) => {
          if (err) {
            console.error('Error executing student query:', err);
            connection.end(); // Close the database connection in case of an error
            return;
          }
  
          // Rendering the admin dashboard view with the retrieved data for both teachers and students
          res.render('admin-dashboard', {
            admin_id: req.session.admin_id,
            departmentData: teacherResults, // Sending teacher department data to the view
            studentData: studentResults // Sending student section data to the view
          });
  
          // Closing the database connection after executing both queries
          connection.end();
        });
      });
    });
  };
  
//students
//teachers
//sections
//departments
//departments
