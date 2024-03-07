const mysql = require("mysql");

require('dotenv').config();

const conn = {
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
};

exports.getIndexSection = (req, res) => {
    const sql = `SELECT * FROM sections ORDER BY visibility DESC, id ASC`;
  
    const connection = mysql.createConnection(conn);
  
    connection.query(sql, (error, results) => {
      if (error) {
        // Handle the error
        console.error(error);
      } else {
        // Render the EJS template and pass the results
        res.render('admin-index-section', { sections: results, admin_id: req.session.admin_id });
      }
      connection.end(); // Close the MySQL connection when done
    });
  };