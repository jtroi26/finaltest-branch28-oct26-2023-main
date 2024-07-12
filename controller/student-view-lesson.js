const mysql = require('mysql');
require('dotenv').config();
const OpenAI = require('openai').OpenAI;
const openai = new OpenAI;
const sanitizeHtml = require('sanitize-html');

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

exports.getLessonPage = (req, res) => {
    const { id } = req.params;

    const studentid = req.session.studentID;
    const sql = `SELECT * FROM lessons WHERE id = ?;`;
    const connection = mysql.createConnection(conn);

    connection.connect((err) => {
        if (err) {
            console.error('Database connection failed:', err);
            return res.status(500).send('Internal Server Error');
        }

        connection.query(sql, [id], (err, results) => {
            if (err) {
                console.error('Error fetching lesson data:', err);
                res.status(500).send('Internal Server Error');
            } else {
                if (results.length === 1) {
                    res.render('student-view-lesson', {id, lessonData: results[0], studentid, speech: null});
                } else {
                    res.status(404).send('Lesson not found');
                }
            }
            connection.end();
        });
    });
};

exports.postOpenAI = async (req, res) => {
    try {
        const userInput = req.body.userInput || 'Hi! How can I help you today?';

        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'system', content: 'You are DAZSMA.AI, a kind and friendly chatbot.' },
                { role: 'user', content: userInput }
            ],
        });


        res.json({ response: response.choices[0].message.content });
    } catch (error) {
        console.error('Error fetching chat response:', error);
        res.status(500).send('Internal Server Error');
    }
};

exports.generate = async (req, res) => {
    const { textToConvert } = req.body;
    try {
      const response = await openai.apiCall({
        endpoint: 'tts/engine/davinci',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        json: {
          text: textToConvert,
          voice: 'en',
        },
      });
  
      if (response && response.data && response.data.audio) {
        const audio = response.data.audio;
        res.json({ speech: audio });
      } else {
        res.status(500).json({ error: 'Failed to generate speech.' });
      }
    } catch (err) {
      console.error('Error generating speech:', err);
      res.status(500).json({ error: 'Error generating speech.' });
    }
}