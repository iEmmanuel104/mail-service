require('dotenv').config({path: '../.env'});

const nodemailer = require("nodemailer")

CLIENT_ID = process.env.CLIENT_ID;
CLIENT_SECRET = process.env.CLIENT_SECRET;
REFRESH_TOKEN = process.env.REFRESH_TOKEN;
EMAIL_SENDER = process.env.EMAIL_SENDER;
EMAIL_RECEIVER = process.env.EMAIL_RECEIVER;

async function sendMail(mail_data) {
    try {
        const smtpTransport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: EMAIL_SENDER,
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
            }
        })
        const mailOptions = {
            from: EMAIL_SENDER,
            to: EMAIL_RECEIVER,
            subject: mail_data.title,
            text: mail_data.message,
            // html: '<h1>Hello na me dey run m, osarobo e clear ba</h1>'
        }
        const result = await smtpTransport.sendMail(mailOptions)
        return result
        
    } catch (error) {
        console.log(error)
    }
}
// sendMail().then(result => console.log('Email sent...', result))
// .catch(error => console.log(error.message))

module.exports = {
    sendMail,
};