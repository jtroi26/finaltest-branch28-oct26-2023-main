const mysql = require("mysql");

require('dotenv').config();

const conn = {
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
};

exports.postSetStatus = (req, res) => {
    const connection = mysql.createConnection(conn);

    const { id } = req.params;
    const value = "Unenrolled";
    
    const sql = `
    UPDATE students
    SET status = ?
    WHERE id = ?;
    `;
    console.log('SQL Query:', sql);
    console.log('Values:', [value, id]);
    
    // Perform the database update operation here using the SQL query

    // Assuming you have a database connection object called 'connection', you can execute the query like this:
    connection.query(sql, [value, id], (error, results) => {
        if (error) {
            console.error('Error updating status:', error);
            res.status(500).send('Internal Server Error');
        } else {
            // Redirect to a page or send a response indicating success
            res.redirect('/admin/index-student'); // Change the URL to the appropriate success page
        }
    });
};