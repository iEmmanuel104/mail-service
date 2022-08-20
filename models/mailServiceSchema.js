const mongoose = require('mongoose')

const mailServiceSchema = new mongoose.Schema({

    name: { 
        type: String,
        required: [true, 'name must be provided'],
    },
    email: {
        type: String,
        required: [true, 'email must be provided'],
    },
    subject: {
        type: String,
        required: [true, 'subject must be provided'],
    },
    message: {
        type: String,
        required: [true, 'message must be provided'],
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
})

module.exports = mongoose.model('MailService', mailServiceSchema)