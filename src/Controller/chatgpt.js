const dotenv = require('dotenv').config();
const {OpenAI} = require("openai");
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const chatGPT = {};
chatGPT.query = async (message) => {
    const chatCompletion = await openai.chat.completions.create({
        messages: [{ role: "user", content: message }],
        model: "gpt-3.5-turbo",
    });
    return chatCompletion.choices[0].message.content;
}

module.exports = {chatGPT};