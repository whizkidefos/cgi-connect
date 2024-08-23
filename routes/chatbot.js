const express = require('express');
const router = express.Router();
const { Configuration, OpenAIApi } = require('openai');

// Configure OpenAI API
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY, // Make sure to set your API key in your environment variables
});
const openai = new OpenAIApi(configuration);

router.post('/', async (req, res) => {
    const { message } = req.body;

    try {
        const response = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo', // or another model of your choice
            messages: [
                { role: 'system', content: 'You are a CRM assistant.' },
                { role: 'user', content: message }
            ],
        });

        const answer = response.data.choices[0].message.content.trim();
        res.json({ answer });
    } catch (err) {
        console.error('Error communicating with OpenAI:', err);
        res.status(500).send('Something went wrong. Please try again.');
    }
});

module.exports = router;