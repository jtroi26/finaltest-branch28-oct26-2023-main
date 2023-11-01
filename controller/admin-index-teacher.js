const mysql = require("mysql");

const conn = {
    host: 'localhost',
    database: 'finalcapstone',
    user: 'root',
    password: ''
};

exports.getIndexTeacherPage = (req, res) => {
    const connection = mysql.createConnection(conn);

    const sql = `SELECT id, teacherid, firstname, middlename, lastname, suffix, department, visibility FROM teacherdetails`;

    connection.query(sql, (err, results) => {
        if (err) {
            console.error("Error retrieving teacher details:", err);
            connection.end(); // Close the database connection
            // Handle the error, e.g., by sending an error response
            res.status(500).json({ error: "An error occurred while retrieving data." });
        } else {
            const teacherData = results.map((td) => {
                // Construct the teacher name as per your requirements
                const suffix = td.suffix === 'null' || td.suffix === null ? '' : td.suffix;
                const teacherName = `${td.firstname} ${td.middlename || ''} ${td.lastname} ${suffix}`.trim();

                // Return the formatted data
                return {
                    id: td.id,
                    teacherid: td.teacherid,
                    teachername: teacherName,
                    department: td.department,
                    visibility: td.visibility,
                };
            });

            connection.end(); // Close the database connection

            // Render the HTML page with the teacher data
            res.render('admin-index-teacher', { teacherData });
        }
    });
};

