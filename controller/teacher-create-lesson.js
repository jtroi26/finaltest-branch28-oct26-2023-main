const mysql = require("mysql");

const conn = {
    host: 'localhost',
    database: 'finalcapstone',
    user: 'root',
    password: ''
};

exports.getLessonCreatePage = (req, res) => {
    const connection = mysql.createConnection(conn);
    const subjectid = req.session.subjectid;
    const subjectname = req.session.subjectname;
    const sectionname = req.session.sectionname;
    

   res.render('teacher-create-lesson', {subjectid, subjectname, sectionname});
};

exports.postLessonCreatePage= (req, res) => {
    const {lessonID, lessonTitle, quarterperiod, section1, section2, section3, section4, section5, section6, section7, section8, section9, section10, visibility} = req.body;
    const teacherid = req.session.teacherid;
    const subjectname = req.session.subjectname;
    const sectionname = req.session.sectionname;
    const dateCreated = new Date();

    const sql = `
    INSERT INTO lessons 
    (lessonID, lessonTitle, subjectname, teacherid, quarterperiod, sectionname, section1, section2, section3, section4, section5, section6, section7, section8, section9, section10, dateCreated, dateUpdated, visibility) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

    const values = [lessonID, lessonTitle, subjectname, teacherid, quarterperiod, sectionname, section1, section2, section3, section4, section5, section6, section7, section8, section9, section10, visibility];

    console.log(dateCreated);


}