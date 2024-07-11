const mysql = require("mysql2/promise");
const sanitizeHtml = require('sanitize-html');
require('dotenv').config();

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

const conn = {
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
};

exports.getIndexPage = async (req, res) => {
    const sectionname = req.session.sectionname;
    const subjectid = req.session.subjectid;
    const subjectname = req.session.subjectname;
    const teacherid = req.session.teacherid;

    const sql = `SELECT id, teacherid, subjectname, sectionname, overview FROM subjectoverview 
    WHERE teacherid = ? AND subjectname = ? AND sectionname = ?;`;
    const values = [teacherid, subjectname, sectionname];

    try {
        const pool = mysql.createPool(conn);
        const connection = await pool.getConnection();
        const [results] = await connection.query(sql, values);

        results.forEach(result => {
            result.overview = sanitizeTinyMceInput(result.overview);
        });

        console.log(results);
        connection.release();

        res.render('teacher-index-subject-overview', {
            results,
            teacherid,
            subjectname,
            sectionname
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};
