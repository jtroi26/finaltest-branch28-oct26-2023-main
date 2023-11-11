const mysql = require("mysql");

const conn = {
      host: 'localhost',
      database: 'finalcapstone',
      user: 'root',
      password: ''
};

// exports.getAnnouncementPage = (req, res) => {

//     const connection = mysql.createConnection(conn);

//     const subjectname = req.session.subjectname;
//     const sectionname = req.session.sectionname;
//     const teacherid = req.session.teacherid;

//     const sql = `select id,
//     teacherid,
//     announcementTitle,
//     announcement
    
//     from teacherannouncements
    
//     where teacherid = ? and subjectname = ? and sectionname = ?;`



//     res.render('student-view-announcement');

// };

exports.getAnnouncementPage = (req, res) => {
    const connection = mysql.createConnection(conn);
  
    const studentid = req.session.studentID;
    const subjectname = req.session.subjectname;
    const sectionname = req.session.sectionname;
    const teacherid = req.session.teacherid;
  
    const sql = `
    SELECT id,
    teacherid,
    announcementTitle,
    announcement
FROM teacherannouncements
WHERE teacherid = ?
   AND subjectname = ?
   AND sectionname = ?
ORDER BY dateCreated DESC`;
  
    connection.query(sql, [teacherid, subjectname, sectionname], (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error fetching announcements');
        return;
      }
  
      const announcements = results;
      // Process the 'announcements' array to prepare it for rendering the template
      // ...
  
      res.render('student-view-announcement', { announcements, studentid:studentid}); // Pass the announcements data to the template
    });
  };
  


    //   const pool = mysql.createPool(conn);
    //   // Extract the sectionname from the session
    // const sectionname = req.session.sectionname;

    // // Construct the SQL query with a placeholder for sectionname
    // const sql = `
    // select
    // s.studentID,
    // CONCAT(s.firstname, ' ', s.middlename, ' ', s.lastname, ' ', s.suffix) AS full_name,
    // s.sectionname
    // from students as s
    // inner join sections as sec
    // on sec.sectionname = s.sectionname
    // inner join subjects as sub
    // on sub.sectionname = sec.sectionname
    
    // where sub.subjectid = 'Math-004' AND s.status = 'Enrolled' AND sub.teacherid = '10420012023'
    // ORDER BY s.lastname ASC`;

    // // Execute the query with the sectionname value
    // pool.query(sql, [sectionname], (error, results) => {
    //     if (error) {
    //         console.error('Error executing SQL query:', error);
    //         // Handle the error appropriately, e.g., send an error response
    //         res.status(500).send('An error occurred.');
    //     } else {
    //         console.log(results);
    //         // Render the 'student-view-classmates' page with the query results
    //         res.render('student-view-classmates', { sectionname, classmates: results });
    //     }
    // });