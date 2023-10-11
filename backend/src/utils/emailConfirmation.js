// utils/email.js

const nodemailer = require('nodemailer');
const fs = require('fs/promises');
const handlebars = require('handlebars');

// Load email configuration from environment variables
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Load the Handlebars template
const emailTemplatePath = './src/utils/emailConfirmation.hbs';

let emailTemplate;

async function loadEmailTemplate() {
  try {
    const templateFile = await fs.readFile(emailTemplatePath, 'utf8');
    emailTemplate = handlebars.compile(templateFile);
  } catch (error) {
    console.error('Error loading email template:', error);
  }
}

loadEmailTemplate();

async function sendConfirmationEmail(userEmail, userName, confirmationLink) {
  try {
    const emailContent = emailTemplate({
      userName,
      confirmationLink,
      name: 'ShiftPlan'
    });

    await transporter.sendMail({
      from: 'ShiftPlan',
      to: userEmail,
      subject: 'Welcome to ShiftPlan! Please confirm your email',
      text: `Thank you for signing up, ${userName}. Please click the link below to confirm your email.`,
      html: emailContent,
    });

    console.log('Confirmation email sent.');
  } catch (error) {
    console.error('Error sending confirmation email:', error);
  }
}

module.exports = {
  sendConfirmationEmail,
};
