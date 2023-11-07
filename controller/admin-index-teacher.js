const mysql = require("mysql");

const conn = {
    host: 'localhost',
    database: 'finalcapstone',
    user: 'root',
    password: ''
};

// Consider using a connection pool
const pool = mysql.createPool(conn);

exports.getIndexTeacherPage = (req, res) => {
    // Use the pool to handle your connections
    pool.getConnection((err, connection) => {
        if (err) {
            console.error("Error getting connection:", err);
            return res.status(500).json({ error: "Database connection failed." });
        }

        const sql = `SELECT 
        td.id AS teacher_id,
        td.teacherid,
        td.firstname,
        td.middlename,
        td.lastname,
        IFNULL(td.suffix, ' ') AS suffix,
        td.department,
        td.visibility,
        tl.userlogin,
        tl.userpassword
    FROM teacherdetails AS td
    INNER JOIN teacherlogins AS tl ON tl.teacherid = td.teacherid;`;
        const sqlDepartment = `SELECT id, department from departments WHERE visibility = 'Visible';`;

        connection.query(sql, (err, results) => {
            if (err) {
                console.error("Error retrieving teacher details:", err);
                connection.release(); // Release the connection back to the pool
                return res.status(500).json({ error: "An error occurred while retrieving teacher data." });
            }

            const teacherData = results.map((td) => ({
                id: td.id,
                teacherid: td.teacherid,
                teachername: `${td.firstname} ${td.middlename || ''} ${td.lastname} ${td.suffix}`.trim(),
                firstname: td.firstname,
                middlename: td.middlename,
                lastname: td.lastname,
                suffix: td.suffix,
                department: td.department,
                visibility: td.visibility,
                userlogin: td.userlogin,
                userpassword: td.userpassword,

            }));

            connection.query(sqlDepartment, (err, departmentResults) => {
                connection.release(); // Always release the connection back to the pool

                if (err) {
                    console.error("Error retrieving departments:", err);
                    return res.status(500).json({ error: "An error occurred while retrieving department data." });
                }

                res.render('admin-index-teacher', { teacherData, departments: departmentResults });
            });
        });
    });
};
