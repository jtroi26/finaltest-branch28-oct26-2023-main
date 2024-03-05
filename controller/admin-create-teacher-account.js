const mysql = require("mysql");
require('dotenv').config();
const bcrypt = require("bcrypt");

const conn = {
    host: 'localhost',
    database: 'finalcapstone',
    user: 'root',
    password: ''
};

exports.getTeacherCreatePage = (req, res) => {
    const connection = mysql.createConnection(conn);

    const sql = `SELECT department FROM departments WHERE visibility = 'Visible'`;
 
    connection.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching departments:', err);
            res.status(500).send('Internal Server Error');
        } else {
            const departments = results; // Assuming the results contain an array of department names
            // Render the 'admin-create-teacher-account' view and pass the 'departments' to it
            // console.log(departments);
            res.render('admin-create-teacher-account', { departments });
        }
        connection.end();
    });
};

exports.postTeacherCreateAccount = (req, res) => {
    const connection = mysql.createConnection(conn);
    const { teacherid, firstname, middlename, lastname, suffix, department, visibility } = req.body;

    // Generate the user login and password based on input data
    const userLogin = generateUserLogin(firstname, middlename, lastname);
    const userPassword = generatePassword();
    console.log(userPassword);

    const sql1 = `INSERT INTO teacherdetails (teacherid, firstname, middlename, lastname, suffix, department, visibility) VALUES (?,?,?,?,?,?,?);`;
    const values1 = [teacherid, firstname, middlename, lastname, suffix, department, visibility];

    // Hash the generated password using bcrypt
    bcrypt.genSalt(parseInt(process.env.SALT_TACCOUNT), function (err, salt) {
        if (err) {
            console.error('Error generating salt:', err);
            res.status(500).json({ error: "An error occurred while hashing the password." });
        } else {
            bcrypt.hash(userPassword, salt, function (err, hashedPassword) {
                if (err) {
                    console.error('Error hashing password:', err);
                    res.status(500).json({ error: "An error occurred while hashing the password." });
                } else {
                    const sql2 = `INSERT INTO teacherlogins (teacherid, userlogin, userpassword) VALUES (?,?,?);`;
                    const values2 = [teacherid, userLogin, hashedPassword];

                    connection.query(sql1, values1, (err1, results1) => {
                        if (err1) {
                            console.error("Error inserting data into teacherdetails:", err1);
                            connection.end(); // Close the database connection
                            res.status(500).json({ error: "An error occurred while inserting data." });
                        } else {
                            connection.query(sql2, values2, (err2, results2) => {
                                connection.end(); // Close the database connection
                                if (err2) {
                                    console.error("Error inserting data into teacherlogins:", err2);
                                    res.status(500).json({ error: "An error occurred while inserting data." });
                                } else {
                                    res.redirect('/admin/index-teacher');
                                }
                            });
                        }
                    });
                }
            });
        }
    });
};

function generateUserLogin(firstName, middleName, lastName) {
    // Create the user login by taking the first letter of the first name, middle name, and the full last name
    const userLogin = (
        (firstName.split(' ')[0].charAt(0).toLowerCase() || '') +
        (firstName.split(' ')[1] ? firstName.split(' ')[1].charAt(0).toLowerCase() : '') +
        middleName.charAt(0).toLowerCase() +
        lastName.toLowerCase()
    );

    // Combine the "t" and user login to create the final user login
    return "t" + "-" + userLogin;
}

function generatePassword() {
    const length = 12; // Adjust the password length as needed
    const charset = process.env.CHARSET || "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*?+";
    let password = "";

    while (password.length < length) {
        const charIndex = Math.floor(Math.random() * charset.length);
        const char = charset.charAt(charIndex);
        password += char;
    }

    return password;
}
