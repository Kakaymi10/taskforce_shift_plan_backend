const validator = require('email-validator');

class AuthValidations {
  static signUp = (req, res, next) => {
    if (req.body.name === '') {
      return res.status(400).json({ message: 'Name must not be empty' });
    }

    if (req.body.name === null) {
      return res.status(400).json({ message: 'Name must not be null' });
    }

    if (!validator.validate(req.body.email)) {
      return res.status(400).json({ message: 'Email must be valid' });
    }

    if (req.body.email === '') {
      return res.status(400).json({ message: 'Email must not be empty' });
    }

    if (req.body.password === null) {
      return res.status(400).json({ message: 'Password must not be null' });
    }

    if (req.body.password.length < 6) {
      return res
        .status(400)
        .json({ message: 'Password must have 6 minum characters' });
    }

    return next();
  };
}

export default AuthValidations;
