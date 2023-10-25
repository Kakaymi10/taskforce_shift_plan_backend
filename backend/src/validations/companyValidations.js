const Joi = require('joi');

const companySchema = Joi.object({
    name: Joi.string().required().messages({
      "string.base": "Company name should be a string",
      "string.empty": "Company name cannot be empty",
      "any.required": "Name is a required field",
    }),
    address: Joi.string().required().messages({
      "string.base": "Company address should be a string",
      "string.empty": "Company address cannot be empty",
      "any.required": "Company address is a required field",
    })
  });

 
 const companyValidations = (req, res, next) => {
      const { error } = companySchema.validate(req.body);
  
      if (error) {
        const errorMessage = error.details[0].message;
        return res.status(400).json({ message: errorMessage });
      }
  
      return next();
    };

    module.exports = companyValidations;

