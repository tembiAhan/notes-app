const Joi = require('joi');
const InvariantError = require('../../exception/InvariantError');

const noteSchema = Joi.object({
  title: Joi.string().required(),
  body: Joi.string().required(),
  tags: Joi.array().items(Joi.string()).required(),
});

const validatePayload = (payload) => {
  const { error } = noteSchema.validate(payload);
  if (error) {
    throw new InvariantError(error.message);
  }
};

module.exports = { validatePayload };
