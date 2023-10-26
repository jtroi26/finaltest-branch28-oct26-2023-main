const mysql = require("mysql");

const conn = {
    host: 'localhost',
    database: 'finalcapstone',
    user: 'root',
    password: ''
};

exports.getViewSection = (req, res) => {
  const connection = mysql.createConnection(conn);
  const { id } = req.params;
  const sql = `SELECT sub.subjectid, s.sectionname, sub.subjectname, CONCAT(td.firstname, ' ', td.middlename, ' ', td.lastname) AS teacher_name
  FROM sections AS s
  INNER JOIN subjects AS sub ON sub.sectionname = s.sectionname
  INNER JOIN teacherdetails AS td ON td.teacherid = sub.teacherid
  WHERE s.id = ?`;

  connection.query(sql, [id], (error, results) => {
    if (error) {
      console.error('Error fetching section data:', error);
      res.status(500).send('Internal Server Error');
    } else {
      if (results.length > 0) {
        const sectionData = results[0];
        const subjects = results.map(row => ({
          subjectid: row.subjectid,
          subjectname: row.subjectname,
          teacher_name: row.teacher_name
        }));
        res.render('admin-view-section', { section: sectionData, subjects });
      } else {
        res.status(404).send('Section not found');
      }
    }
  });
};

