const mysql = require("mysql");

require('dotenv').config();

const conn = {
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
};

// Create a connection pool
const pool = mysql.createPool(conn);

exports.getAnnouncementIndexPage = (req, res) => {
        const studentid = req.session.studentID;
        console.log(req.session.sectionname);
    
        const sectionname = req.session.sectionname; // Assuming sectionname is stored in the session
    
        const sql = `
            SELECT ta.id, ta.announcementTitle, ta.subjectname, ta.announcement, ta.dateCreated
            FROM sections AS s
            INNER JOIN teacherannouncements AS ta ON s.sectionname = ta.sectionname
            WHERE s.sectionname = ?
            ORDER BY ta.dateCreated DESC;`;
    
        // Use the connection pool to get a connection
        exports.getConnection((err, connection) => {
            if (err) {
                console.error('Error getting database connection:', err);
                res.status(500).send('Internal Server Error');
                return;
            }
    
            // Execute the query
            connection.query(sql, [sectionname], (err, results) => {
                // Release the connection back to the pool
                connection.release();
    
                if (err) {
                    console.error('Error fetching announcements:', err);
                    res.status(500).send('Internal Server Error');
                    return;
                }
    
                // Convert dateCreated to the desired format (MM-DD-YY)
                results = results.map(result => {
                    result.dateCreated = new Date(result.dateCreated).toLocaleDateString('en-US', {
                        year: '2-digit',
                        month: '2-digit',
                        day: '2-digit'
                    });
                    return result;
                });
    
                console.log(results);
                // Assuming you have a template engine (like EJS) for rendering
                res.render('student-index-announcements', { announcements: results , studentid: studentid});
            });
        });
    };
    
