const Joi = require('joi');
const InvariantError = require('../../exception/InvariantError');

const userSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
  fullname: Joi.string().required(),
});

const validatePayload = (payload) => {
  const { error } = userSchema.validate(payload);
  if (error) {
    throw new InvariantError(error.message);
  }
};

module.exports = { validatePayload };
