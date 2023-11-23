const mysql = require("mysql");

const conn = {
    host: 'localhost',
    database: 'finalcapstone',
    user: 'root',
    password: ''
};

exports.getSubjectOverviewForm = (req, res) => {
    const connection = mysql.createConnection(conn);
    const teacherid = req.session.teacherid;
    const subjectname = req.session.subjectname;
    const sectionname = req.session.sectionname;
    console.log(teacherid);
    console.log(subjectname);
    console.log(sectionname);
    
   res.render('teacher-create-subject-overview', {teacherid: req.session.teacherid});
};

exports.postSubjectOverviewForm= (req, res) => {
    const connection = mysql.createConnection(conn);
    const teacherid = req.session.teacherid;
    const subjectname = req.session.subjectname;
    const sectionname = req.session.sectionname;
    const {overview} = req.body;

    const sql = `INSERT INTO subjectoverview (teacherid,subjectname,sectionname,overview) VALUES (?,?,?,?);`;
    const values = [teacherid, subjectname, sectionname, overview];
   
    connection.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error creating subject overview:', err);
            // Handle the error (e.g., send an error response)
            res.status(500).send('Internal Server Error');
        } else {
            // Successfully inserted the new section
            // You can redirect to a success page or perform other actions
            
            res.redirect('/teacher/subjectoverview')
        }
        // Close the database connection
        connection.end();
    });
}

function formatCustomDateTime(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const milliseconds = String(date.getMilliseconds()).padStart(3, '0');
  
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
  }
  
