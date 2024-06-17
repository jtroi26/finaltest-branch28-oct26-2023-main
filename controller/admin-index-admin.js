const mysql = require("mysql");
const bcrypt = require("bcrypt");

require('dotenv').config();

const conn = {
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
};

// Consider using a connection pool
const pool = mysql.createPool(conn);

exports.getIndexAdmin = (req, res) => {
        // Use the pool to handle your connections
        pool.getConnection((err, connection) => {
            if (err) {
                console.error("Error getting connection:", err);
                return res.status(500).json({ error: "Database connection failed." });
            }

            const sql = `
            SELECT 
            ad.id AS id,
            ad.admin_id,
            ad.firstname,
            ad.middlename,
            ad.lastname,
            ad.department,
            ad.visibility,
            ad.role,
            al.username,
            al.userpassword,
                CONCAT(
                    ad.firstname,
                    ' ',
                    IFNULL(ad.middlename, ''),
                    ' ',
                    ad.lastname,
                    ' '
                ) AS teachername
            FROM admindetails AS ad
            INNER JOIN adminlogins AS al ON al.admin_id = ad.admin_id`;

            const sqlDepartment = `SELECT id, department from departments WHERE visibility = 'Visible';`;

            connection.query(sql, (err, results) => {
                if (err) {
                    console.error("Error retrieving teacher details:", err);
                    connection.release(); // Release the connection back to the pool
                    return res.status(500).json({ error: "An error occurred while retrieving teacher data." });
                }

                connection.query(sqlDepartment, (err, departmentResults) => {
                    connection.release(); // Always release the connection back to the pool
    
                    if (err) {
                        console.error("Error retrieving departments:", err);
                        return res.status(500).json({ error: "An error occurred while retrieving department data." });
                    }

            res.render('admin-index-admin', {data: results, departments: departmentResults, admin_id: req.session.admin_id });
                });
            });
        });

}

exports.postAdminAccount = (req, res) => {
    const connection = mysql.createConnection(conn);
    const { admin_id, firstname, middlename, lastname, department, visibility } = req.body;

    const role = "Admin";

    // Generate the user login and password based on input data
    const userLogin = generateUserLogin(firstname, middlename, lastname);
    const userPassword = generatePassword();
    console.log(userPassword);

    const sql1 = `INSERT INTO admindetails (admin_id, firstname, middlename, lastname, department, visibility, role) VALUES (?,?,?,?,?,?,?);`;
    const values1 = [admin_id, firstname, middlename, lastname, department, visibility, role];


        // Hash the generated password using bcrypt
        bcrypt.genSalt(parseInt(process.env.SALT_TACCOUNT), function (err, salt) {
            if (err) {
                console.error('Error generating salt:', err);
                res.status(500).json({ error: "An error occurred while hashing the password." });
                req.flash('error', "Invalid Data");
            } else {
                bcrypt.hash(userPassword, salt, function (err, hashedPassword) {
                    if (err) {
                        console.error('Error hashing password:', err);
                        res.status(500).json({ error: "An error occurred while hashing the password." });
                        req.flash('error', "Invalid Data");
                    } else {
                        const sql2 = `INSERT INTO adminlogins (admin_id, username, userpassword) VALUES (?,?,?);`;
                        const values2 = [admin_id, userLogin, hashedPassword];
    
                        connection.query(sql1, values1, (err1, results1) => {
                            if (err1) {
                                console.error("Error inserting data into admindetails:", err1);
                                connection.end(); // Close the database connection
                                res.status(500).json({ error: "An error occurred while inserting data." });
                                req.flash('error', "Invalid Data");
                            } else {
                                connection.query(sql2, values2, (err2, results2) => {
                                    connection.end(); // Close the database connection
                                    if (err2) {
                                        console.error("Error inserting data into adminlogins:", err2);
                                        res.status(500).json({ error: "An error occurred while inserting data." });
                                        req.flash('error', "Invalid Data");
                                    } else {
                                        req.flash('success', "Created Successfully");
                                        res.redirect('/admin-index-admin');
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });

    
}

exports.getViewAdmin = (req, res) => {
    const { id } = req.params;
    const connection = mysql.createConnection(conn);

    const sql1 = `SELECT * FROM admindetails WHERE id = ?`;
    const sql2 = `SELECT username, userpassword FROM adminlogins WHERE admin_id = ?`;

    connection.query(sql1, [id], (err1, results1) => {
        if (err1) {
            console.error("Error retrieving teacher details:", err1);
            connection.end();
            res.status(500).json({ error: "An error occurred while retrieving data." });
        } else {
            const adminData = results1[0]; // Assuming there's only one matching record

            // Now, retrieve user login and password based on teacherid
            connection.query(sql2, [adminData.admin_id], (err2, results2) => {
                if (err2) {
                    console.error("Error retrieving user login and password:", err2);
                    connection.end();
                    res.status(500).json({ error: "An error occurred while retrieving data." });
                } else {
                    const loginData = results2[0]; // Assuming there's only one matching record

                    connection.end();

                    // Combine the teacher data and login data
                    const combinedData = { ...adminData, ...loginData };

                    // Render the HTML page with the combined data
                    res.render('admin-index-admin', { combinedData });
                }
            });
        }
    });
}

exports.getEditAdmin = (req, res) => {
    const { id } = req.params;
    const connection = mysql.createConnection(conn);

    const sql = `SELECT * FROM admindetails WHERE id = ?`;
    const values = id;

    connection.query(sql, [values], (err, results) => {
        if (err) {
            console.error("Error retrieving teacher details:", err);
            connection.end();
            res.status(500).json({ error: "An error occurred while retrieving data." });
        } else {
            const adminData = results[0]; // Assuming there's only one matching record

            // Now, fetch the departments from the database
            const departmentsSql = `SELECT department FROM departments WHERE visibility = 'Visible'`;
            connection.query(departmentsSql, (departmentsErr, departmentsResults) => {
                if (departmentsErr) {
                    console.error('Error fetching departments:', departmentsErr);
                    connection.end();
                    res.status(500).send('Internal Server Error');
                } else {
                    const departments = departmentsResults; // Assuming the results contain an array of department names

                    connection.end();

                    // Render the 'admin-edit-teacher-account' view and pass the 'adminData' and 'departments' to it
                    res.render('admin-index-admin', { adminData, departments });
                }
            });
        }
    });
}

exports.postEditAdmin = (req, res) => {
    const {id} = req.params;
    const {admin_id, firstname, middlename, lastname, department, visibility} = req.body;

    console.log("id: " + id);
    console.log(req.body);

    const connection = mysql.createConnection(conn);
    const sql = `
    UPDATE admindetails 
    SET admin_id = ?, firstname = ?, middlename = ?, lastname = ?, department = ?, visibility = ? 
    WHERE id = ?;
`;

    const values = [admin_id, firstname, middlename, lastname, department, visibility, id];

    connection.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error updating teacher details:', err);
            res.status(500).send('Internal Server Error');
            req.flash('error', "Invalid Data");
        } else {
            // Successfully updated the department
            req.flash('update', "Update Successfully");
            res.redirect('/admin-index-admin');
        }
        // Close the database connection
        connection.end();
    });
}


function generateUserLogin(firstName, middleName, lastName) {
    // Create the user login by taking the first letter of the first name, middle name, and the full last name
    const userLogin = (
        (firstName.split(' ')[0].charAt(0).toLowerCase() || '') +
        (firstName.split(' ')[1] ? firstName.split(' ')[1].charAt(0).toLowerCase() : '') +
        middleName.charAt(0).toLowerCase() +
        lastName.toLowerCase()
    );

    // Combine the "t" and user login to create the final user login
    return "admin" + "-" + userLogin;
}

function generatePassword() {
    // const length = 12; // Adjust the password length as needed
    // const charset = process.env.CHARSET || "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*?+";
    // let password = "";

    // while (password.length < length) {
    //     const charIndex = Math.floor(Math.random() * charset.length);
    //     const char = charset.charAt(charIndex);
    //     password += char;
    // }
    let password = process.env.TEMP_PASSWORD;

    return password;
}