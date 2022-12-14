require('dotenv').config();
const MailService = require('../models/mailServiceSchema');


// add a new mail info
const addMailInfo = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    const newMailInfo = new MailService({
      name,
      email,
      subject,
      message,
    });    
    await newMailInfo.save();
    res.status(201).json(newMailInfo);

    // Send email to admin -> contains contact form data
    let mail_data = {
        email: process.env.ADMIN_EMAIL_ADDRESS,
        title: `Contact form submission from ${new_contactform.email}`,
        message: `
            Name: ${req.body.name}
            Email: ${req.body.email}
            Message: ${req.body.message}
            Form id: ${new_contactform._id}
        `
    }
    await sendMail(mail_data);

    res.status(200).send(new_contactform);

  } catch (error) {
      console.log(error);
  }
};

// Get all mail info
const getAllMailInfo = async (req, res) => {
  try {
  const mailInfo = await MailService.find().sort('createdAt');
  res.status(200).json({ mailInfo });
  } catch (error) {
    console.log(error);
  }
};

// Get mail info by id
const getMailInfo = async (req, res) => {
  try {
    const mailInfo = await MailService.findById(req.params.id);
    res.status(200).json(mailInfo);
    if (!mailInfo) {
      return res.status(404).json({ message: 'No mail info found' });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
// update mail info
const updateMailInfo = async (req, res) => {
  try {
    const mailInfo = await MailService.findOneAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!mailInfo) {
      return res.status(404).json({ message: 'No mail info found' });
    }
    res.status(200).json(mailInfo);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// delete mail info
const deleteMailInfo = async (req, res) => {
  try {
    const mailInfo = await MailService.findOneAndDelete(req.params.id);
    res.status(200).json(mailInfo);
  } catch (error) { 
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  addMailInfo,
  getAllMailInfo,
  getMailInfo,
  updateMailInfo,
  deleteMailInfo,
}
