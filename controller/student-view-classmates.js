const mysql = require("mysql");

const conn = {
      host: 'localhost',
      database: 'finalcapstone',
      user: 'root',
      password: ''
};

exports.getClassmatesPage = (req, res) => {
      const pool = mysql.createPool(conn);
      // Extract the sectionname from the session
    const sectionname = req.session.sectionname;

    // Construct the SQL query with a placeholder for sectionname
    const sql = `
        SELECT 
            s.studentID,
            CONCAT(s.firstname, ' ', s.middlename, ' ', s.lastname, ' ', s.suffix) AS full_name,
            s.sectionname
        FROM students AS s
        INNER JOIN subjects AS sub ON sub.sectionname = s.sectionname
        WHERE s.sectionname = ? AND s.status = 'Enrolled'
        ORDER BY s.lastname ASC;`;

    // Execute the query with the sectionname value
    pool.query(sql, [sectionname], (error, results) => {
        if (error) {
            console.error('Error executing SQL query:', error);
            // Handle the error appropriately, e.g., send an error response
            res.status(500).send('An error occurred.');
        } else {
            console.log(results);
            // Render the 'student-view-classmates' page with the query results
            res.render('student-view-classmates', { sectionname, classmates: results });
        }
    });
};
