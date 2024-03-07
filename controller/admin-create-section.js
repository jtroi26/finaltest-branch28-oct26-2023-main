const mysql = require("mysql");

require('dotenv').config();

const conn = {
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
};

exports.getCreateSection = (req, res) => {
      res.render('admin-create-section');
}
exports.postCreateSection = (req, res) => {
      const { sectionname , visibility} = req.body;
      const connection = mysql.createConnection(conn);
      // Define the SQL INSERT statement to insert a new section
      const sql = `INSERT INTO sections (sectionname, visibility) VALUES (?,?)`;
  
      // Specify the values to be inserted into the table
      const values = [sectionname, visibility];
  
      // Create a connection to your database (Assuming you have established the connection earlier)
  
      // Execute the SQL INSERT statement
      connection.query(sql, values, (err, result) => {
          if (err) {
              console.error('Error creating section:', err);
              // Handle the error (e.g., send an error response)
              res.status(500).send('Internal Server Error');
          } else {
              // Successfully inserted the new section
              // You can redirect to a success page or perform other actions
              
              res.redirect('/admin/index-section');
          }
  
          // Close the database connection
          connection.end();
      });
  };