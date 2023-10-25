const handlebars = require('handlebars');
const { transporter, loadEmailTemplate } = require('./emailService');

async function sendConfirmationEmail(
  userEmail,
  userName,
  confirmationLink,
  emailTemplatePath,
) {
  try {
    const emailTemplateContent = await loadEmailTemplate(emailTemplatePath);
    const emailTemplate = handlebars.compile(emailTemplateContent);

    const emailContent = emailTemplate({
      userName,
      confirmationLink,
      name: 'ShiftPlan',
    });

    await transporter.sendMail({
      from: 'ShiftPlan',
      to: userEmail,
      subject: 'Welcome to ShiftPlan! Please confirm your email',
      text: `Thank you for signing up, ${userName}. Please click the link below to confirm your email.`,
      html: emailContent,
    });
  } catch (error) {
    console.log(error.message)
    throw error;
  }
}

async function sendInvitationEmail(
  userEmail,
  userName,
  loginLink,
  password,
  emailTemplatePath,
) {
  try {
    const emailTemplateContent = await loadEmailTemplate(emailTemplatePath);
    const emailTemplate = handlebars.compile(emailTemplateContent);

    const emailContent = emailTemplate({
      userName,
      loginLink,
      name: 'ShiftPlan',
      password,
    });

    await transporter.sendMail({
      from: 'ShiftPlan',
      to: userEmail,
      subject: "Welcome to ShiftPlan! You've been invited to our platform!",
      text: `You've been invited to our shiftPlan platform. Please use your email and the provided password to login "${password}"`,
      html: emailContent,
    });
  } catch (error) {
    console.log(error.message)
    throw error;
  }
}

async function sendConfirmationEmailSuccessfully(
  userEmail,
  userName,
  emailTemplatePath,
) {
  try {
    const emailTemplateContent = await loadEmailTemplate(emailTemplatePath);
    const emailTemplate = handlebars.compile(emailTemplateContent);

    const emailContent = emailTemplate({
      userName,
      name: 'ShiftPlan',
    });

    await transporter.sendMail({
      from: 'ShiftPlan',
      to: userEmail,
      subject: 'Email confirmation succesfully!',
      text: `Hello ${{ userName }}, your email was confirmed succesfully!`,
      html: emailContent,
    });
  } catch (error) {
    console.log(error.message)
    throw error;
  }
}

async function sendresetPasswordSuccessfully(
  userEmail,
  userName,
  emailTemplatePath,
) {
  try {
    const emailTemplateContent = await loadEmailTemplate(emailTemplatePath);
    const emailTemplate = handlebars.compile(emailTemplateContent);

    const emailContent = emailTemplate({
      userName,
      name: 'ShiftPlan',
    });

    await transporter.sendMail({
      from: 'ShiftPlan',
      to: userEmail,
      subject: 'Password reset succesfully!',
      text: `Hello ${{
        userName,
      }}, your account password has been successfully changed.`,
      html: emailContent,
    });
  } catch (error) {
    console.log(error.message)
    throw error;
  }
}

module.exports = {
  sendConfirmationEmail,
  sendInvitationEmail,
  sendConfirmationEmailSuccessfully,
  sendresetPasswordSuccessfully,
};
