const mysql = require("mysql");

const conn = {
    host: 'localhost',
    database: 'finalcapstone',
    user: 'root',
    password: ''
};

exports.getIndexTeacherPage = (req, res) => {
    const connection = mysql.createConnection(conn);

    const sql = `SELECT id, teacherid, firstname, middlename, lastname, suffix, department, visibility FROM teacherdetails;`
    const sqlDepartment = `SELECT id, department from departments WHERE visibility = 'Visible';`

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

            // Now, fetch the departments
            connection.query(sqlDepartment, (err, departmentResults) => {
                if (err) {
                    console.error("Error retrieving departments:", err);
                    connection.end(); // Close the database connection
                    // Handle the error, e.g., by sending an error response
                    res.status(500).json({ error: "An error occurred while retrieving data." });
                } else {
                    const departments = departmentResults.map((dept) => dept.department);

                    connection.end(); // Close the database connection

                    // Render the HTML page with the teacher and department data
                    res.render('admin-index-teacher', { teacherData, departments });
                }
            });
        }
    });
};

