const Joi = require('joi');

// Create a Joi schema for department creation
const createDepartmentSchema = Joi.object({
  name: Joi.string().required(),
  companyId: Joi.number().required(),
});

// Create a Joi schema for department update
const updateDepartmentSchema = Joi.object({
  name: Joi.string(),
  companyId: Joi.number(),
});

module.exports = { createDepartmentSchema, updateDepartmentSchema };
