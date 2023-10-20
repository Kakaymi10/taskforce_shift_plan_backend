const Joi = require('joi');

// Create a Joi schema for department creation
const createAbsenceSchema = Joi.object({
  userId: Joi.string().required(),
  reason: Joi.string().required(),
  date: Joi.date().required(),
});



module.exports = { createAbsenceSchema};
