const Joi = require('joi');

const departmentSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.base": "Company name should be a string",
    "string.empty": "Company name cannot be empty",
    "any.required": "Name is a required field",
  }),
  userId: Joi.string().messages({
    "string.empty": "User Id cannot be empty",
    "any.required": "User Id company Id is required",
  })
});


const departmentValidations = (req, res, next) => {
    const { error } = departmentSchema.validate(req.body);

    if (error) {
      const errorMessage = error.details[0].message;
      return res.status(400).json({ message: errorMessage });
    }

    return next();
  };

  module.exports = departmentValidations;
