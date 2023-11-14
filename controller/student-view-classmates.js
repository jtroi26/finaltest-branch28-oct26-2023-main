const mysql = require("mysql");

const conn = {
      host: 'localhost',
      database: 'finalcapstone',
      user: 'root',
      password: ''
};

exports.getClassmatesPage = (req, res) => {
      const pool = mysql.createPool(conn);
      const studentid  = req.session.studentID;
      // Extract the sectionname from the session
    const sectionname = req.session.sectionname;
    const teacherid = req.session.teacherid;
    const enrolled = 'Enrolled';
    // Construct the SQL query with a placeholder for sectionname
    const sql = `
    select
    s.studentID,
    CONCAT(s.firstname, ' ', s.middlename, ' ', s.lastname, ' ', s.suffix) AS full_name,
    s.sectionname
    from students as s
    inner join sections as sec
    on sec.sectionname = s.sectionname
    inner join subjects as sub
    on sub.sectionname = sec.sectionname
    
    where s.sectionname = ? AND s.status = ? AND sub.teacherid = ?
    ORDER BY s.lastname ASC`;

    const values = [sectionname, enrolled, teacherid]
    // Execute the query with the sectionname value
    pool.query(sql, values, (error, results) => {
        if (error) {
            console.error('Error executing SQL query:', error);
            // Handle the error appropriately, e.g., send an error response
            res.status(500).send('An error occurred.');
        } else {
            console.log(results);
            console.log(sectionname);
            console.log(teacherid);
            // Render the 'student-view-classmates' page with the query results
            res.render('student-view-classmates', { sectionname, studentid, classmates: results });
        }
    });
};
