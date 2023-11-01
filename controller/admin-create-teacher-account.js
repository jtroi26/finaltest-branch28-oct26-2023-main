const mysql = require("mysql");

const conn = {
    host: 'localhost',
    database: 'finalcapstone',
    user: 'root',
    password: ''
};

exports.getTeacherCreatePage = (req, res) => {
    const connection = mysql.createConnection(conn);

    const sql = `SELECT department FROM departments`;

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

    // Include the generated values in the response
    // console.log(req.body);
    // console.log(userLogin);
    // console.log(userPassword);

    const sql1 = `INSERT INTO teacherdetails (teacherid, firstname, middlename, lastname, suffix, department, visibility) VALUES (?,?,?,?,?,?,?);`;
    const values1 = [teacherid, firstname, middlename, lastname, suffix, department, visibility];

    const sql2 = `INSERT INTO teacherlogins (teacherid, userlogin, userpassword) VALUES (?,?,?);`;
    const values2 = [teacherid, userLogin, userPassword];

    // Wrap each database operation in a promise
    const insertDetails = new Promise((resolve, reject) => {
        connection.query(sql1, values1, (err1, results1) => {
            if (err1) {
                console.error("Error inserting data into teacherdetails:", err1);
                reject(err1);
            } else {
                resolve(results1);
            }
        });
    });

    const insertLogins = new Promise((resolve, reject) => {
        connection.query(sql2, values2, (err2, results2) => {
            if (err2) {
                console.error("Error inserting data into teacherlogins:", err2);
                reject(err2);
            } else {
                resolve(results2);
            }
        });
    });

    // Use Promise.all to execute both promises in parallel
    Promise.all([insertDetails, insertLogins])
        .then((results) => {
            connection.end(); // Close the database connection
            // Both queries were successful
            res.redirect('/admin/index-teacher');
        })
        .catch((errors) => {
            connection.end(); // Close the database connection
            // Handle any errors that occurred during the database operations
            res.status(500).json({ error: "An error occurred while inserting data." });
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
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*?+";
    let password = "";

    while (password.length < length) {
        const charIndex = Math.floor(Math.random() * charset.length);
        const char = charset.charAt(charIndex);
        password += char;
    }

    return password;
}
