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
    const chatHistory = req.session.chatHistory || [];

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
                res.render('student-view-lesson', { lessonData: results[0] , studentid: studentid, chatHistory});
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

        // Update the chat history in the session
        req.session.chatHistory = [
            ...(req.session.chatHistory || []),
            { role: 'user', content: userInput },
            { role: 'bot', content: response.choices[0].message.content }
        ];

        res.redirect('/student/view/lessons')
    } catch (error) {
        console.error('Error fetching chat response:', error);
        res.status(500).send('Internal Server Error');
    }
}