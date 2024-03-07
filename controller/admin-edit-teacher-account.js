const mysql = require("mysql");

require('dotenv').config();

const conn = {
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
};

exports.getEditTeacherAccountPage = (req, res) => {
    const { id } = req.params;
    const connection = mysql.createConnection(conn);

    const sql = `SELECT * FROM teacherdetails WHERE id = ?`;
    const values = id;

    connection.query(sql, [values], (err, results) => {
        if (err) {
            console.error("Error retrieving teacher details:", err);
            connection.end();
            res.status(500).json({ error: "An error occurred while retrieving data." });
        } else {
            const teacherData = results[0]; // Assuming there's only one matching record

            // Now, fetch the departments from the database
            const departmentsSql = `SELECT department FROM departments WHERE visibility = 'Visible'`;
            connection.query(departmentsSql, (departmentsErr, departmentsResults) => {
                if (departmentsErr) {
                    console.error('Error fetching departments:', departmentsErr);
                    connection.end();
                    res.status(500).send('Internal Server Error');
                } else {
                    const departments = departmentsResults; // Assuming the results contain an array of department names

                    connection.end();

                    // Render the 'admin-edit-teacher-account' view and pass the 'teacherData' and 'departments' to it
                    res.render('admin-edit-teacher-account', { teacherData, departments });
                }
            });
        }
    });
};


exports.postEditTeacherAccountPage = (req, res) => {
    const {id} = req.params;
    const {teacherid, firstname, middlename, lastname, suffix, department, visibility} = req.body;

    console.log("id: " + id);
    console.log(req.body);

    const connection = mysql.createConnection(conn);
    const sql = `
    UPDATE teacherdetails 
    SET teacherid = ?, firstname = ?, middlename = ?, lastname = ?, suffix = ?, department = ?, visibility = ? 
    WHERE id = ?;
`;

    const values = [teacherid, firstname, middlename, lastname, suffix, department, visibility, id];

    connection.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error updating teacher details:', err);
            res.status(500).send('Internal Server Error');
        } else {
            // Successfully updated the department
            res.redirect('/admin/index-teacher');
        }
        // Close the database connection
        connection.end();
    });
}