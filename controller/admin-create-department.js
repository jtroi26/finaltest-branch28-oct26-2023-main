const mysql = require("mysql");

require('dotenv').config();

const conn = {
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
};

exports.getCreateDepartmentPage = (req, res) => {
      res.render('admin-create-department');
}
exports.postCreateDepartmentPage = (req, res) => {
    const connection = mysql.createConnection(conn);

    const { department , visibility} = req.body;
    console.log(req.body);
    const sql = `INSERT INTO departments (department, visibility) VALUES (?,?)`;
    const values = [department, visibility];
  
    // Execute the SQL INSERT statement
    connection.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error creating department:', err);
            // Handle the error (e.g., send an error response)
            res.status(500).send('Internal Server Error');
        } else {
            // Successfully inserted the new department
            // You can redirect to a success page or perform other actions
            res.redirect('/admin/index-department');
            return; // Add this return statement to prevent further code execution
        }
        // Close the database connection
        connection.end();
    });
}
