const mysql = require("mysql");

const conn = {
    host: 'localhost',
    database: 'finalcapstone',
    user: 'root',
    password: ''
};

exports.getSubjectModules = (req, res) => {
    // const connection = mysql.createConnection(conn);
    const subjectid = req.session.subjectid;
    const subjectname = req.session.subjectname;
    const sectionname = req.session.sectionname;
    // console.log(subjectid);
    
    res.render('teacher-lesson-modules',{ subjectid, subjectname, sectionname});
};