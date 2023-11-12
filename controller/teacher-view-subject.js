const mysql = require("mysql");

const conn = {
    host: 'localhost',
    database: 'finalcapstone',
    user: 'root',
    password: ''
};

exports.getSubjectPage = (req, res) => {
    const connection = mysql.createConnection(conn);
    const id = req.params.id; // Assuming 'id' is a route parameter

    const sql = `
        SELECT subjects.subjectid, subjects.subjectname, subjects.sectionname, teacherdetails.teacherid, teacherdetails.firstname, teacherdetails.middlename, teacherdetails.lastname, subjects.visibility
        FROM subjects
        INNER JOIN teacherdetails ON subjects.teacherid = teacherdetails.teacherid
        WHERE subjects.id = ?`;

    const sqloverview = `
        SELECT overview FROM subjectoverview
        WHERE teacherid = ? AND subjectname = ? AND sectionname = ?;`;

    connection.query(sql, [id], (error, subjectResults) => {
        if (error) {
            console.error('Error executing SQL query:', error);
            connection.end();
            return res.status(500).send('Internal Server Error');
        }

        if (subjectResults.length === 1) {
            console.log('Subject query result:', subjectResults);

            // Extract subject details
            const {
                sectionname,
                subjectname,
                subjectid,
                teacherid,
                firstname,
                middlename,
                lastname
            } = subjectResults[0];

            req.session.sectionname = sectionname;
            req.session.subjectname = subjectname;
            req.session.subjectid = subjectid;
            req.session.teacherid = teacherid;
            req.session.firstname = firstname;
            req.session.middlename = middlename;
            req.session.lastname = lastname;

            console.log('in view subject');
            console.log("sectionname: " + req.session.sectionname);
            console.log("subjectname: " + req.session.subjectname);
            console.log("subjectid: " + req.session.subjectid);
            console.log("teacherid: " + req.session.teacherid);

            const values = [teacherid, subjectname, sectionname];

            // Execute the second query
            connection.query(sqloverview, values, (err, overviewResults) => {
                if (err) {
                    console.error('Error executing sqloverview query:', err);
                    connection.end(); // Close the connection in case of an error
                    return res.status(500).send('Internal Server Error');
                }

                console.log('Overview query result:', overviewResults);

                if (overviewResults.length > 0) {
                    // Render the page with both sets of results
                    res.render('teacher-view-subject', {
                        sectionname: req.session.sectionname,
                        subjectname: req.session.subjectname,
                        subjectid: req.session.subjectid,
                        teacherid: req.session.teacherid,
                        firstname: req.session.firstname,
                        middlename: req.session.middlename,
                        lastname: req.session.lastname,
                        overview: overviewResults.length > 0 ? overviewResults[0].overview : "Overview not yet set"
                    });
                } else {
                    console.error('No results found for overview');
                    res.status(404).send('Overview not found');
                }

                connection.end(); // Close the connection after rendering the page
            });
        } else {
            console.error('No or multiple results found');
            res.status(404).send('Subject not found');
            connection.end(); // Close the connection in case of an error
        }
    });
};
