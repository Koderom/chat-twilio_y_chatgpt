const dotenv = require('dotenv').config();
const {chatGPT} = require('./chatgpt');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

const client = require('twilio')(accountSid, authToken);
const twilioController = {}

function respond(response, sender) {
    client.messages.create({
        from: `whatsapp:${twilioPhoneNumber}`,
        body: `${response}`,
        to: `whatsapp:${sender}`
    }).then(message => console.log(message.sid));
}

function getSender(originNumber){
    return originNumber.slice(9);
}

twilioController.messageReceived = async (req, res) => {
    const message = req.body.Body;
    const sender = getSender(req.body.From);
    const response = await chatGPT.query(message);
    respond(response, sender);

    console.log(response);
    res.status(200).send('mensaje recibido');
}

module.exports = {twilioController};