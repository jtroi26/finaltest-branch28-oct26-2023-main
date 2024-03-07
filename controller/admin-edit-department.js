const mysql = require("mysql");

require('dotenv').config();

const conn = {
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
};

exports.getEditDepartmentPage = (req, res) => {
    const { id } = req.params;
    const connection = mysql.createConnection(conn);
    const sql = `SELECT id, department, visibility FROM departments WHERE id = ?`;
    const values = [id]; // You should pass values as an array

    connection.query(sql, values, (err, result) => {
        if (err) {
            // Handle errors here
            console.error('Error fetching department data:', err);
            res.status(500).send('Internal Server Error');
        } else {
            if (result.length === 0) {
                res.status(404).send('Department not found');
            } else {
                const departmentData = result[0]; // Assuming there's only one department with the given ID
                res.render('admin-edit-department', { departmentData });
            }
        }

        // Close the database connection
        connection.end();
    });
};
exports.postEditDepartmentPage = (req, res) => {
    const connection = mysql.createConnection(conn); // Create a new connection here

    const { id } = req.params;
    const { department, visibility } = req.body;
    const values = [department, visibility, id]; // Corrected the order of values
    const sql = `
    UPDATE departments
    SET
    department = ?,
    visibility = ?
    WHERE id = ?; 
    `;

    connection.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error updating department:', err);
            res.status(500).send('Internal Server Error');
        } else {
            // Successfully updated the department
            res.redirect('/admin/index-department');
        }

        // Close the database connection
        connection.end();
    });
};
