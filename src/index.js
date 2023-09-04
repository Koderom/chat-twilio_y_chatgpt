const dotenv = require('dotenv').config();
const express = require('express');
const {twilioController} = require('./Controller/twilioController');

const app = express();
const port = process.env.PORT || 3000;

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/test', (req, res) => {
    res.status(200).send("mensaje recibido");
});
app.post('/messageReceived', twilioController.messageReceived);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})