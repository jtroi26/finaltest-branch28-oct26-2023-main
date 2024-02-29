const mysql = require("mysql");
require('dotenv').config();
const OpenAI = require('openai').OpenAI;
const openai = new OpenAI;

const conn = {
    host: 'localhost',
    database: 'finalcapstone',
    user: 'root',
    password: ''
};


exports.getLessonPage = (req, res) => {
    const { id } = req.params;

    const studentid = req.session.studentID;
    const sql = `SELECT * FROM lessons WHERE id = ?;`;
    const connection = mysql.createConnection(conn); // Create a new connection
    connection.query(sql, id, (err, results) => {
        if (err) {
            console.error('Error fetching lesson data:', err);
            connection.end(); // Close the database connection in case of an error
            res.status(500).send('Internal Server Error');
        } else {
            if (results.length === 1) {
                // Successfully fetched the lesson data
                // Pass the single result (row) to the template
                res.render('student-view-lesson', { lessonData: results[0] , studentid: studentid, speech: null});
            } else {
                res.status(404).send('Lesson not found'); // Handle the case where no or multiple rows are found
            }

            connection.end(); // Close the database connection after rendering the template or sending an error response
        }
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