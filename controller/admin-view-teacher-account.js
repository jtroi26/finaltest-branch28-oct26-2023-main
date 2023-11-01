const mysql = require("mysql");

const conn = {
    host: 'localhost',
    database: 'finalcapstone',
    user: 'root',
    password: ''
};

exports.getTeacherAccountView = (req, res) => {
    const { id } = req.params;
    const connection = mysql.createConnection(conn);

    const sql1 = `SELECT * FROM teacherdetails WHERE id = ?`;
    const sql2 = `SELECT userlogin, userpassword FROM teacherlogins WHERE teacherid = ?`;

    connection.query(sql1, [id], (err1, results1) => {
        if (err1) {
            console.error("Error retrieving teacher details:", err1);
            connection.end(); // Close the database connection
            // Handle the error, e.g., by sending an error response
            res.status(500).json({ error: "An error occurred while retrieving data." });
        } else {
            const teacherData = results1[0]; // Assuming there's only one matching record

            // Now, retrieve user login and password based on teacherid
            connection.query(sql2, [teacherData.teacherid], (err2, results2) => {
                if (err2) {
                    console.error("Error retrieving user login and password:", err2);
                    connection.end(); // Close the database connection
                    // Handle the error, e.g., by sending an error response
                    res.status(500).json({ error: "An error occurred while retrieving data." });
                } else {
                    const loginData = results2[0]; // Assuming there's only one matching record

                    connection.end(); // Close the database connection

                    // Combine the teacher data and login data
                    const combinedData = { ...teacherData, ...loginData };

                    // Render the HTML page with the combined data
                    res.render('admin-view-teacher-account', { combinedData });
                }
            });
        }
    });
};

