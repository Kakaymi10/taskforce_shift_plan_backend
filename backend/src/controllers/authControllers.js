const { hashPassword, generateToken } = require('../utils/auth-helper');
const db = require('../../models/index');

const { User } = db;

class AuthController {
  static async signUp(req, res) {
    const { name, email, password } = req.body;

    try {
      const user = await User.findOne({ where: { email } });

      if (user) {
        res.status(403).send({ message: 'User already exists', user });
      } else if (!user) {
        const hashedPassword = await hashPassword(password);
        const newUser = await User.create({
          name,
          email,
          password: hashedPassword,
        });

        const userToken = generateToken(newUser);

        res.status(201).send({
          message: 'Signed Up successfully',
          token: userToken,
          user: { id: newUser.id, email: newUser.email, name: newUser.name },
        });
      }
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  }

}

module.exports = AuthController;