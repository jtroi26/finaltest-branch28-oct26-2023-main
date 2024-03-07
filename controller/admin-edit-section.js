const mysql = require("mysql");

require('dotenv').config();

const conn = {
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
};

exports.getEditSectionPage = (req, res) => {
  const { id } = req.params;
  const connection = mysql.createConnection(conn);
  const sql = `SELECT id, sectionname, visibility FROM sections WHERE id = ?`;
  const values = [id]; // You should pass values as an array

  connection.query(sql, values, (err, result) => {
    if (err) {
      // Handle errors here
      res.send('Error fetching section data');
    } else {
      const sectionData = result[0]; // Assuming there's only one section with the given ID
      res.render('admin-edit-section', { sectionData });
    }
  });
}

exports.postEditSectionPage = (req, res) => {
  const { id } = req.params;
  const { sectionname, visibility } = req.body;
  const connection = mysql.createConnection(conn);
  const values = [sectionname, visibility, id];
  const sql = `
    UPDATE sections
    SET
    sectionname = ?, visibility = ?
    WHERE id = ?;
  `;

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error updating section:', err);
      res.status(500).send('Internal Server Error');
    } else {
      // Successfully updated the subject
      res.redirect('/admin/index-section');
    }

    // Close the database connection
    connection.end();
  });
}
