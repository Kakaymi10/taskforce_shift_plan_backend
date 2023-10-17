const handlebars = require('handlebars');
const { transporter, loadEmailTemplate } = require('./emailService');



async function sendConfirmationEmail(userEmail, userName, confirmationLink, emailTemplatePath) {
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

async function sendInvitationEmail(userEmail, userName, loginLink, companyName, password) {
  try {
    const emailTemplateContent = await loadEmailTemplate(emailTemplatePath);
    const emailTemplate = handlebars.compile(emailTemplateContent);

    const emailContent = emailTemplate({
      userName,
      loginLink,
      name: 'ShiftPlan'
    });

    await transporter.sendMail({
      from: 'ShiftPlan',
      to: userEmail,
      subject: "Welcome to ShiftPlan! You've been invited to our platform!",
      text: `You've been invited to our shiftPlan platform. Please use your email and the provided password to login "${password}"`,
      html: emailContent,
    });

    console.log('Invitation email sent.');
  } catch (error) {
    console.error('Error sending confirmation email:', error);
  }
}

module.exports = {
  sendConfirmationEmail,
  sendInvitationEmail
};
