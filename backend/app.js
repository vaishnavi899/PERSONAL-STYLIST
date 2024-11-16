const express = require('express');
const bodyParser = require('body-parser');
const dialogflow = require('@google-cloud/dialogflow');

const app = express();
app.use(bodyParser.json());

app.post('/chatbot', async (req, res) => {
  const { message } = req.body;

  // Call Dialogflow or custom logic here
  const responseMessage = `Echo: ${message}`; // Simple echo response
  res.json({ response: responseMessage });
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
