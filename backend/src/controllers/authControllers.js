const { hashPassword, generateToken } = require('../utils/auth-helper');
const db = require('../../models/index');
// Import the email module
const { sendConfirmationEmail } = require('../utils/emailConfirmation');

const { User } = db;

class AuthController {
  static async signUp(req, res) {
    const { name, email, password } = req.body;

    try {
      const user = await User.findOne({ where: { email } });

      if (user) {
        res.status(403).send({ message: 'User already exists', user });
      } else if (!user) {
        const confirmationToken = generateToken({ email });
        const hashedPassword = await hashPassword(password);
        const newUser = await User.create({
          name,
          email,
          password: hashedPassword,
          token:  confirmationToken
        });

        // After successfully creating the user, send a confirmation email
        const confirmationLink = `http://localhost:3000/shift-planner/api/v1/auth/confirm-email?token=${newUser.token}`;
        await sendConfirmationEmail(newUser.email, newUser.name, confirmationLink);

        const userToken = generateToken(newUser);
        

        res.status(201).send({
          message: 'User signed up successfully. Check your email for confirmation.',
          token: userToken,
          user: { id: newUser.id, email: newUser.email, name: newUser.name },
        });
      }
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  }


  static async confirmEmail(req, res) {
    const { token } = req.query;

    try {
      const user = await User.findOne({ where: { confirmationToken: token } });

      if (user) {
        // Update the 'confirmedAt' field with the current date and time
        user.confirmedAt = new Date();
        await user.save();

        return res.status(200).send('Email confirmed successfully.');
      } else {
        return res.status(400).send('Invalid confirmation token.');
      }
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  }

}

module.exports = AuthController;