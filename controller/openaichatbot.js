const mysql = require('mysql');
const express = require('express');
const OpenAI = require('openai');
const apiKey = process.env.OPENAI_API_KEY; // Use environment variable for API key
const openai = new OpenAI({ key: apiKey });

exports.getopenaichatbot = async (req, res) => {
  try {
    const prompt = 'Translate the following English text to French:';

    const response = await openai.Completions.create({
      engine: 'text-davinci-003', // Latest version
      prompt,
      max_tokens: 150,
    });

    const generatedText = response.choices[0].text;
    console.log(generatedText);

    res.render('openaichatbot', { generatedText });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};
