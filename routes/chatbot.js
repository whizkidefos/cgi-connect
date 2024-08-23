const { Configuration, OpenAIApi } = require('openai');

// Correct way to initialize the Configuration and OpenAIApi
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,  // Your OpenAI API key from the .env file
});

const openai = new OpenAIApi(configuration);

// Example function to interact with OpenAI API
async function sendMessageToChatbot(message) {
    try {
        const response = await openai.createChatCompletion({
            model: 'gpt-4o-mini',  // Specify the model you want to use
            messages: [
                { role: 'system', content: 'You are a CRM assistant.' },
                { role: 'user', content: message }
            ],
        });

        console.log(response.data.choices[0].message.content);
    } catch (err) {
        console.error('Error communicating with OpenAI:', err.message);
    }
}

// Test the function
sendMessageToChatbot("What is a CRM?");
