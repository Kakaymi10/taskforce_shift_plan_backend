const Joi = require('joi');

const signUpSchema = Joi.object({
  name: Joi.string().required().max(255).messages({
    "string.base": "Name should be a string",
    "string.empty": "Name cannot be empty",
    "string.max": "Name should have a maximum length of {#limit}",
    "any.required": "Name is a required field",
  }),
  email: Joi.string().email().required().messages({
    "string.base": "Email should be a string",
    "string.email": "Email must be a valid email address",
    "string.empty": "Email cannot be empty",
    "any.required": "Email is a required field",
  }),
  password: Joi.string().required().min(6).messages({
    "string.base": "Password should be a string",
    "string.empty": "Password cannot be empty",
    "string.min": "Password should have a minimum length of {#limit}",
    "any.required": "Password is a required field",
  }),
});

class AuthValidations {
  static signUp = (req, res, next) => {
    const { error } = signUpSchema.validate(req.body);

    if (error) {
      const errorMessage = error.details[0].message;
      return res.status(400).json({ message: errorMessage });
    }

    return next();
  };

static login = (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    return next();
  };
static forgotPassword = (req, res, next) => {
    const {email} = req.body;

    if (!email) {
      return res
        .status(400)
        .json({ message: "Email required" });
    }

    return next();
  };
}

module.exports = AuthValidations;
