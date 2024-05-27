const Joi = require("joi");
module.exports.validateUser = (body) => {
  return Joi.object({
    username: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  }).validate(body);
};

module.exports.validateUserLogin = (body) => {
  return Joi.object({
    username: Joi.string().email().required(),
    password: Joi.string().required(),
  }).validate(body);
};

module.exports.validateEmployee = (body) => {
  return Joi.object({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    national_id: Joi.string().length(16).required(),
    phone: Joi.string()
      .pattern(/^\d{10}$/)
      .required(),
    department: Joi.string().required(),
    manufacturer: Joi.string().required(),
    position: Joi.string().required(),
    email: Joi.string().email().required(),
    serialNumber: Joi.number().min(0).required(),
    model: Joi.string().required(),
  }).validate(body);
};
