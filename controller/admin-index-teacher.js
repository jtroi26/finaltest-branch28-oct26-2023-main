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

        const sql =
            `SELECT
            td.id AS teacher_id,
            td.teacherid,
            td.firstname,
            td.middlename,
            td.lastname,
            IFNULL(td.suffix, ' ') AS suffix,
                td.department,
                td.visibility,
                tl.userlogin,
                tl.userpassword,
                CONCAT(
                    td.firstname,
                    ' ',
                    IFNULL(td.middlename, ''),
                    ' ',
                    td.lastname,
                    ' ',
                    IFNULL(td.suffix, '')
                ) AS teachername
            FROM teacherdetails AS td
            INNER JOIN teacherlogins AS tl ON tl.teacherid = td.teacherid`;

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

                res.render('admin-index-teacher', { data: results, departments: departmentResults ,admin_id: req.session.admin_id });
            });
        });
    });
};