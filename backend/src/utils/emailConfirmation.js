// utils/sendConfirmationEmail.js

const handlebars = require('handlebars');
const { transporter, loadEmailTemplate } = require('./emailService');
const emailTemplatePath = './src/utils/emailConfirmation.hbs'; // Correct the path

async function sendConfirmationEmail(userEmail, userName, confirmationLink) {
  try {
    const emailTemplateContent = await loadEmailTemplate(emailTemplatePath);
    const emailTemplate = handlebars.compile(emailTemplateContent);

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