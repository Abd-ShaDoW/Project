const joi = require('joi');

const authSchema = joi.object({
  email: joi.string().email().lowercase().required(),
  password: joi.string().min(5).required(),
  name: joi.string().required(),
});

module.exports = { authSchema };
