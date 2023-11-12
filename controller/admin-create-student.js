const mysql = require('mysql');
const fs = require('fs');
const fastCsv = require('fast-csv');
const multer = require('multer');
const path = require('path');

const conn = {
    host: 'localhost',
    database: 'finalcapstone',
    user: 'root',
    password: ''
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './uploads');
    },
    filename: (req, file, callback) => {
        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });

exports.getCreateStudent = (req, res) => {
    const sql = `SELECT id, sectionname FROM sections WHERE visibility = 'Visible';`;
    const connection = mysql.createConnection(conn);

    connection.connect((err) => {
        if (err) {
            console.error('Error connecting to the database:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        // Execute the SQL query to retrieve data
        connection.query(sql, (err, results) => {
            if (err) {
                console.error('Error:', err);
                connection.end(); // Close the database connection in case of an error
                res.status(500).send('Internal Server Error');
                return;
            }

            connection.end(); // Close the database connection

            // Pass the data to your EJS template and render it
            res.render('admin-create-student', { sections: results });
        });
    });
};


exports.postCreateStudentUpload = (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded');
    }

    const filePath = req.file.path;

    const uploadCallback = () => {
        res.redirect('/admin/create/student');
    };

    uploadCsv(filePath, uploadCallback);
};

exports.postCreateStudentManual = (req, res) => {
    const { studentID, firstname, middlename, lastname, suffix, sectionname, dateEnrolled, status } = req.body;
    const newDate = new Date(dateEnrolled).toISOString().slice(0, 19).replace("T", " ");

    const studentLogin = generateUserLogin(firstname, middlename, lastname);
    const studentPassword = generatePassword();

    const sql1 = `INSERT INTO students (studentID, firstname, middlename, lastname, suffix, sectionname, dateEnrolled, status) VALUES (?,?,?,?,?,?,?,?);`;
    const values1 = [studentID, firstname, middlename, lastname, suffix, sectionname, newDate, status];

    const sql2 = `INSERT INTO studentlogins (studentID, studentUserName, studentPassword) VALUES (?,?,?);`;
    const values2 = [studentID, studentLogin, studentPassword];

    const connection = mysql.createConnection(conn);

    connection.connect((err) => {
        if (err) {
            console.error('Error connecting to the database:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        // Execute the first SQL query to insert data into the students table
        connection.query(sql1, values1, (err, results1) => {
            if (err) {
                console.error('Error inserting data into students:', err);
                res.status(500).send('Error inserting data into students');
                connection.end();
                return res.redirect('/admin/create/student'); // Redirect the user back to the create student page
            }

            // Execute the second SQL query to insert data into the studentlogins table
            connection.query(sql2, values2, (err, results2) => {
                if (err) {
                    console.error('Error inserting data into studentlogins:', err);
                    res.status(500).send('Error inserting data into studentlogins');
                    connection.end();
                    return res.redirect('/admin/create/student'); // Redirect the user back to the create student page
                }

                // Both queries were successful, so redirect the user to a success page or take further action
                res.redirect('/admin/index-student'); // Change this URL to your desired success page

                connection.end(); // Close the database connection
            });
        });
    });
};



// function uploadCsv(filePath, callback) {
//     const stream = fs.createReadStream(filePath);
//     const csvData = [];
//     const fileStream = fastCsv.parse({ headers: true }).on('data', (data) => {
//         csvData.push(data);
//     }).on('end', () => {
//         const connection = mysql.createPool(conn);
//         const query = 'INSERT INTO students (studentID, firstname, middlename, lastname, suffix, sectionname) VALUES ?';
//         const values = csvData.map((row) => [row.studentID, row.firstname, row.middlename, row.lastname, row.suffix, row.sectionname]);
//         connection.query(query, [values], (error) => {
//             connection.end(); // Close the connection
//             if (error) {
//                 console.error(error);
//             }
//             callback();
//         });
//     });
//     stream.pipe(fileStream);
// }
function uploadCsv(filePath, callback) {
    const stream = fs.createReadStream(filePath);
    const csvData = [];
    const connection = mysql.createPool(conn);

    const fileStream = fastCsv.parse({ headers: true }).on('data', (data) => {
        csvData.push(data);
    }).on('end', () => {
        connection.getConnection((error, conn) => {
            if (error) {
                console.error(error);
                return;
            }

            const query = 'INSERT INTO students (studentID, firstname, middlename, lastname, suffix, sectionname, dateEnrolled, status) VALUES ?';
            const values = csvData.map((row) => [
                row.studentID, row.firstname, row.middlename, row.lastname, row.suffix, row.sectionname, row.dateEnrolled, row.status
            ]);

            // Execute the first SQL query to insert data into the students table
            conn.query(query, [values], (err) => {
                if (err) {
                    console.error('Error inserting data into students:', err);
                    conn.release(); // Release the connection
                } else {
                    // SQL1 was successful, now proceed with SQL2
                    const studentUserLogins = csvData.map((row) => ({
                        studentID: row.studentID,
                        studentUserName: generateUserLogin(row.firstname, row.middlename, row.lastname),
                        studentPassword: generatePassword()
                    }));

                    const sql2 = 'INSERT INTO studentlogins (studentID, studentUserName, studentPassword) VALUES ?';
                    const sql2Values = studentUserLogins.map((login) => [
                        login.studentID, login.studentUserName, login.studentPassword
                    ]);

                    // Execute the second SQL query to insert data into the studentlogins table
                    conn.query(sql2, [sql2Values], (err) => {
                        if (err) {
                            console.error('Error inserting data into studentlogins:', err);
                        } else {
                            console.log('Data inserted successfully into students and studentlogins');
                        }
                        conn.release(); // Release the connection
                        callback();
                    });
                }
            });
        });
    });

    stream.pipe(fileStream);
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
    return "DAZSMA" + "-" + userLogin;
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