const mysql = require("mysql");

const conn = {
    host: 'localhost',
    database: 'finalcapstone',
    user: 'root',
    password: ''
};

exports.getIndexSection = (req, res) => {
    const sql = `SELECT * FROM sections WHERE visibility = 'Visible' ORDER BY sectionname ASC`;
  
    const connection = mysql.createConnection(conn);
  
    connection.query(sql, (error, results) => {
      if (error) {
        // Handle the error
        console.error(error);
      } else {
        // Render the EJS template and pass the results
        res.render('admin-index-section', { sections: results });
      }
      connection.end(); // Close the MySQL connection when done
    });
  };