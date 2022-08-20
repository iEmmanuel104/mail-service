require('dotenv').config();

const nodemailer = require("nodemailer"),
    EMAIL_HOST_ADDRESS = process.env.EMAIL_HOST_ADDRESS;

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        type: "OAuth2",
        user: process.env.EMAIL_HOST_ADDRESS,
        pass: process.env.EMAIL_HOST_PASS,
        clientId: process.env.OAUTH_CLIENT_ID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN,
    }
});

function mailOptions(email_address, subject, message) {
    return {
        from: EMAIL_HOST_ADDRESS,
        to: email_address,
        subject: subject,
        text: message
    };
}

function sendMail(mail_data) {
    return new Promise((resolve, reject) => {
        try {
            let user_mail_option = mailOptions(
                mail_data.email,
                mail_data.title,
                mail_data.message
            );

            // Send token and reset link to user's Email address
            transporter.sendMail(user_mail_option, (error, info) => {
                if (error) { throw error } else { console.log("Email sent: " + info.response); resolve(info) }
            });
        } catch (error) {
            console.log(error);
            reject(error)
        }
    })
};


module.exports = {
    sendMail,
};