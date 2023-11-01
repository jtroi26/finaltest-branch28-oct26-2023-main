const mysql = require("mysql");

const conn = {
    host: 'localhost',
    database: 'finalcapstone',
    user: 'root',
    password: ''
};

exports.getIndexDepartment = (req, res) => {
    const sql = `SELECT * FROM departments ORDER BY department ASC`;

    const connection = mysql.createConnection(conn);

    connection.query(sql, (error, results) => {
        if (error) {
            // Handle the error
            console.error(error);
        } else {
            // Render the EJS template and pass the results
            res.render('admin-index-department', { departments: results });
        }
        connection.end(); // Close the MySQL connection when done
    });
};
