const mysql = require("mysql");

require('dotenv').config();

const conn = {
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
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
        where dept.visibility = 'Visible'
        GROUP BY td.department, dept.department;
      `;

    // Query to retrieve student information
    const studentsql = `
        SELECT sections.sectionname, COUNT(students.sectionname) AS students_count
        FROM sections
        LEFT JOIN students ON students.sectionname = sections.sectionname
        WHERE sections.visibility = 'Visible'
        GROUP BY sections.sectionname
        ORDER BY sections.id ASC;
      `;

    // Query to check the number of assessment done by assessmenttypes
    const assessmentsql = `
        SELECT ass.assessmenttype, COUNT(ass.id) AS assessment_count
        FROM assessments ass
        INNER JOIN assessmenttype AS asstype ON asstype.assessmenttype = ass.assessmenttype
        GROUP BY ass.assessmenttype
        ORDER BY ass.id ASC;
      `;

    // Query to check the number of assessment done by dates
    const assessmentdatesql = `
    SELECT MONTHNAME(ass.dateGiven) AS month_name, COUNT(ass.id) AS assessment_date
    FROM assessments ass
    INNER JOIN assessmenttype AS asstype ON asstype.assessmenttype = ass.assessmenttype
    GROUP BY MONTH(ass.dateGiven)
    ORDER BY MONTH(ass.dateGiven) ASC;
    
      `;

    // Query to retrieve student count
    const studentcountsql = `
        SELECT COUNT(*) AS enrolled_count FROM students WHERE status = 'Enrolled';
        `;

    // Query to retrieve teacher count
    const teachercountsql = `
        SELECT COUNT(*) AS teachercount FROM teacherdetails;
        `;

    // Query to retrieve teacher count
    const subjectcountsql = `
        SELECT COUNT(*) AS subjectcount FROM subjects
        where visibility = 'Visible';
        `;

    // Query to retrieve teacher count
    const sectioncountsql = `
      SELECT COUNT(*) AS sectioncount FROM sections
      where visibility = 'Visible';
      `;

    // Query to retrieve number of assessments per subject
    const numassessmentpersubject = `
      SELECT subjectname, 
       COUNT(CASE WHEN assessmenttype = 'Assignment' THEN 1 END) AS Assignments,
       COUNT(CASE WHEN assessmenttype = 'Periodical Exam' THEN 1 END) AS 'Periodical Exams',
       COUNT(CASE WHEN assessmenttype = 'Quiz' THEN 1 END) AS Quizzes,
       COUNT(CASE WHEN assessmenttype = 'Recitation' THEN 1 END) AS Recitations,
       COUNT(CASE WHEN assessmenttype = 'Summative Exam' THEN 1 END) AS 'Summative Exams'
      FROM assessments
      GROUP BY subjectname;
      `

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

        connection.query(studentcountsql, function (err, studentcountResults) {
          if (err) {
            // Handle error
            console.error(err);
            return;
          }

          connection.query(teachercountsql, function (err, teachercountResults) {
            if (err) {
              // Handle error
              console.error(err);
              return;
            }

            connection.query(subjectcountsql, function (err, subjectcountResults) {
              if (err) {
                // Handle error
                console.error(err);
                return;
              }

              connection.query(sectioncountsql, function (err, sectioncountResults) {
                if (err) {
                  // Handle error
                  console.error(err);
                  return;
                }

                connection.query(assessmentsql, function (err, assessmentcountResults) {
                  if (err) {
                    // Handle error
                    console.error(err);
                    return;
                  }

                  connection.query(assessmentdatesql, function (err, assessmentdatecountResults) {
                    if (err) {
                      // Handle error
                      console.error(err);
                      return;
                    }
                    connection.query(numassessmentpersubject, function (err, numassessmentResults) {
                      if (err) {
                        // Handle error
                        console.error(err);
                        return;
                      }
                      console.log(numassessmentResults);

                      // Rendering the admin dashboard view with the retrieved data for both teachers and students
                      res.render('admin-dashboard', {
                        admin_id: req.session.admin_id,
                        departmentData: teacherResults, // Sending teacher department data to the view
                        studentData: studentResults, // Sending student section data to the view
                        assessmentData: assessmentcountResults,
                        assessmentdateData: assessmentdatecountResults,
                        enrolledCount: studentcountResults[0].enrolled_count, // Sending enrolled student count to the view
                        teachercount: teachercountResults[0].teachercount,
                        subjectcount: subjectcountResults[0].subjectcount,
                        sectioncount: sectioncountResults[0].sectioncount,
                        numassessmentResults: numassessmentResults
                      });

                      // Closing the database connection after executing both queries
                      connection.end();
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  });
};

//students
//teachers
//sections
//departments
//departments
