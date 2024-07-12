const mysql = require("mysql");
const sanitizeHtml = require('sanitize-html');
require('dotenv').config();

const conn = {
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
};

const tinyMceAllowedTags = [
    'a', 'b', 'blockquote', 'br', 'caption', 'code', 'col', 'colgroup',
    'dd', 'div', 'dl', 'dt', 'em', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 
    'i', 'img', 'li', 'ol', 'p', 'pre', 'span', 'strong', 'table', 
    'tbody', 'td', 'tfoot', 'th', 'thead', 'tr', 'ul'
];

const tinyMceAllowedAttributes = {
    a: ['href', 'name', 'target'],
    img: ['src', 'alt', 'width', 'height'],
    '*': ['style', 'class', 'id']
};

const sanitizeTinyMceInput = (input) => {
    return sanitizeHtml(input, {
        allowedTags: tinyMceAllowedTags,
        allowedAttributes: tinyMceAllowedAttributes,
        selfClosing: ['img', 'br', 'hr'],
        allowedSchemes: ['http', 'https', 'mailto'],
        allowedSchemesByTag: {
            img: ['http', 'https', 'data']
        }
    });
};

exports.getLessonPageView = (req, res) => {
    const { id } = req.params;
    const { subjectname, sectionname, teacherid } = req.session;

    const sql = `SELECT * FROM lessons WHERE id = ? AND sectionname = ? AND subjectname = ? AND teacherid = ?;`;
    const values = [id, sectionname, subjectname, teacherid];

    const connection = mysql.createConnection(conn);

    connection.connect((err) => {
        if (err) {
            console.error('Database connection failed:', err);
            return res.status(500).send('Internal Server Error');
        }

        connection.query(sql, values, (err, results) => {
            if (err) {
                console.error('Error fetching lesson:', err);
                res.status(500).send('Internal Server Error');
            } else {
                if (results.length === 0) {
                    res.status(404).send('Lesson not found');
                } else {
                    const lessonData = results[0];
                    res.render('teacher-view-lesson', { lesson: lessonData, teacherid });
                }
            }
            connection.end();
        });
    });
};