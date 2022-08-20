require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require('./db/connect');
const mailrouter = require('./routes/mailrouter');

app.use(express.json());

app.get('/', (req, res) => {
  res.send('<h1>Quick Contact Form MailAPI');
});

app.use('/api/v1/mail', mailrouter);

const PORT = process.env.PORT || 3000;

const start = async () => {
    try {
        // Connect DB before you start server
        await connectDB(process.env.MONGO_URI);

        //initialise Express server
        app.listen(PORT, () => console.log(`Server is listening on port ${PORT} .....`));
    } catch (error) {
        console.log(error);
    }
}

start();