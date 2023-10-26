const mysql = require("mysql");

const conn = {
    host: 'localhost',
    database: 'finalcapstone',
    user: 'root',
    password: ''
};

exports.getCreateSection = (req, res) => {
      res.render('admin-create-section');
}
exports.postCreateSection = (req, res) => {
      const { sectionname } = req.body;
      const connection = mysql.createConnection(conn);
      // Define the SQL INSERT statement to insert a new section
      const sql = `INSERT INTO sections (sectionname) VALUES (?)`;
  
      // Specify the values to be inserted into the table
      const values = [sectionname];
  
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
              
              res.redirect('/admin/create-section');
          }
  
          // Close the database connection
          connection.end();
      });
  };