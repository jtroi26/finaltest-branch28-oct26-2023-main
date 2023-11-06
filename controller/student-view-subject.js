const mysql = require("mysql");

const conn = {
    host: 'localhost',
    database: 'finalcapstone',
    user: 'root',
    password: ''
};

exports.getSubjectView = (req, res) => {
    const { id } = req.params;
    const sql = `SELECT subjects.id, subjects.subjectid, subjects.subjectname, subjects.teacherid, subjects.sectionname,teacherdetails.firstname, teacherdetails.middlename, teacherdetails.lastname, teacherdetails.suffix
    FROM subjects 
    INNER JOIN teacherdetails ON teacherdetails.teacherid = subjects.teacherid
    WHERE subjects.id = ?;`;

    const connection = mysql.createConnection(conn); // Create a new connection

    connection.query(sql, id, (err, result) => {
        if (err) {
            console.error('Error fetching subject data:', err);
            connection.end(); // Close the database connection in case of an error
            res.status(500).send('Internal Server Error');
        } else {
            // Successfully fetched the subject data
            // Pass the result to the template

            const idofsubject = result[0].id;
            const subjectID = result[0].subjectid;
            const subjectname = result[0].subjectname;
            const sectionname = result[0].sectionname;
            const teacherid = result[0].teacherid;

            req.session.subID = idofsubject;
            req.session.subjectID = subjectID;
            req.session.subjectname = subjectname;
            req.session.sectionname = sectionname;
            req.session.teacherid = teacherid;

             console.log('in student-viewsubject');
            console.log(req.session.subID);
            console.log(req.session.subjectID);
            console.log(req.session.subjectname);
            console.log(req.session.sectionname);
            console.log(req.session.teacherid);

            res.render('student-view-subject', { subjectData: result[0] });

            connection.end(); // Close the database connection after rendering the template
        }
    });
};
