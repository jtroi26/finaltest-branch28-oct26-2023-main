const mysql = require("mysql");

const conn = {
    host: 'localhost',
    database: 'finalcapstone',
    user: 'root',
    password: ''
};

exports.getGradesPage = (req, res) => {
    const connection = mysql.createConnection(conn);
    const sectionname = req.session.sectionname;
    const subjectid = req.session.subjectid;
    const subjectname = req.session.subjectname;
    const teacherid = req.session.teacherid;

    console.log('in grades page');

    console.log(sectionname);
    console.log(subjectid);
    console.log(teacherid);


    const sql = `
        SELECT
            s.id,
            s.studentID,
            CONCAT(s.lastname, ', ', s.firstname, ' ', s.suffix, ', ', SUBSTRING(s.middlename, 1, 1), '.') AS full_name,
            s.sectionname,
            sub.teacherid,
            sub.subjectid,
            s.status
            
        FROM students AS s
        INNER JOIN subjects AS sub
        ON sub.sectionname = s.sectionname
        WHERE sub.teacherid = ?  
            AND sub.subjectid = ?  
            AND s.sectionname = ?  
            AND s.status = 'Enrolled'
        ORDER BY full_name ASC, s.status ASC;
    `;
    const values = [teacherid, subjectid, sectionname];

    connection.query(sql, values, (error, results) => {
        if (error) {
            console.error(error);
            // Handle the error
        } else {
            console.log(results);
            res.render('teacher-create-grades', {students: results, subjectname:subjectname, sectionname:sectionname});
        }
    });

    connection.end(); // Close the database connection when done.
};

exports.postGradesPage = (req, res) => {


    const sectionname = req.session.sectionname;
    const subjectid = req.session.subjectid;
    const subjectname = req.session.subjectname;
    const teacherid = req.session.teacherid;

    const { assessmentTitle, assessmenttype, quarterperiod, dateGiven, studentID,  grade, total } = req.body;

    const sql = `INSERT INTO assessments (assessmentTitle, assessmenttype, quarterperiod, studentID, sectionname, subjectname, teacherid, grade, total) VALUES (?,?,?,?,?,?,?,?,?)`

    // const currentDate = new Date();
    // const options = { year: 'numeric', month: 'long', day: 'numeric' };
    // const formattedDate = dateGiven.toLocaleDateString(undefined, options);

    const values = [assessmentTitle, assessmenttype, quarterperiod, studentID, sectionname, subjectname, teacherid, grade, total];

    // connection.query(sql, [id], (err, results) => {
    //     if(err){
    //         console.error('Error fetching attendance data:', err);
    //         // Handle the error (e.g., return an error response)
    //         res.status(500).send('Internal Server Error');
    //     }else{
    //         res.render('teacher-create-grades');
    //     }
    // });

    // Ensure that studentID and attendance are arrays
    if (!Array.isArray(studentID)) {
        // If not an array, convert to an array with a single element
        studentID = [studentID];
        grade = [grade];
    }

    // Ensure that the arrays have the same length
    if (studentID.length !== grade.length) {
        // Handle the error (e.g., return an error response)
        return res.status(400).send('Mismatched data');
    }

    const connection = mysql.createConnection(conn);

   for (let i = 0; i < studentID.length; i++) {
        if (grade[i] === 'NULL' || grade[i] === null) {
            // Skip this iteration of the loop if grade is 'NULL' or null
            continue;
        }

        // If grade is not 'NULL' or null, proceed to insert data


        connection.query(sql, values, (err, results) => {
            if (err) {
                console.error('Error inserting assessments:', err);
                // Handle the error (e.g., return an error response)
                res.status(500).send('Internal Server Error');
            }
        });
    }

    connection.end();
    res.redirect('/teacher/create/grades');
};