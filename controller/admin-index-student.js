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
      CONCAT(firstname, ' ', middlename, ' ', lastname,' ', 
        CASE WHEN suffix = 'none' THEN ' ' ELSE suffix END
      ) AS 'Student Name',
      sectionname,
      dateEnrolled,
      status
    FROM students
    ORDER BY studentID DESC, status ASC
  `;
  const sectionsql = `SELECT sectionname FROM sections WHERE visibility = 'Visible'`;
  const connection = mysql.createConnection(conn);

  connection.query(sql, (err, results) => {
    if (err) {
        console.error('Error:', err);
        connection.end();
        res.status(500).send('Internal Server Error');
        return;
    }

    // Format dateEnrolled field
    results.forEach(result => {
        result.dateEnrolled = new Date(result.dateEnrolled).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
    });

    connection.query(sectionsql, (err, sectionResults) => {
        if (err) {
            console.error('Error:', err);
            connection.end();
            res.status(500).send('Internal Server Error');
            return;
        }
        connection.end();
        res.render('admin-index-student', { data: results, section: sectionResults, admin_id: req.session.admin_id });
    });
});
};
