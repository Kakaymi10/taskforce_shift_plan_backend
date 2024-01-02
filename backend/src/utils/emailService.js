const nodemailer = require('nodemailer');
const fs = require('fs/promises');

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

async function loadEmailTemplate(emailTemplatePath) {
  try {
    const templateFile = await fs.readFile(emailTemplatePath, 'utf8');
    return templateFile;
  } catch (error) {
    console.log(error.message)
    throw error;
  }
}

module.exports = {
  transporter,
  loadEmailTemplate,
};
