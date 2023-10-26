const mysql = require("mysql");

const conn = {
    host: 'localhost',
    database: 'finalcapstone',
    user: 'root',
    password: ''
};

exports.getSubjectView = (req, res) => {
    const connection = mysql.createConnection(conn);

    const { id } = req.params;

    // Query the database to fetch data for the subject with the specified subjectID (id)
    const sql = `
        SELECT s.subjectid, 
        s.subjectname, 
        s.sectionname, 
        td.firstname, 
        td.middlename, 
        td.lastname, 
        td.teacherid,
        CONCAT(td.firstname, ' ', td.middlename, ' ', td.lastname) AS teacher
        FROM subjects as s 
        INNER JOIN teacherdetails as td ON s.teacherid = td.teacherid 
        WHERE s.subjectid = ?`;

    connection.query(sql, [id], (error, results) => {
        if (error) {
            console.error('Error fetching subject data:', error);
            res.status(500).send('Internal Server Error');
        } else {
            if (results.length > 0) {
                const subjectData = results[0];
                res.render('admin-view-subject', { subject: subjectData });
            } else {
                res.status(404).send('Subject not found');
            }
        }
    });
};