const Joi = require('joi');
const InvariantError = require('../../exception/InvariantError');

const collaborationSchema = Joi.object({
  noteId: Joi.string().required(),
  userId: Joi.string().required(),
});

const validatePayload = (payload) => {
  const { error } = collaborationSchema.validate(payload);
  if (error) {
    throw new InvariantError(error.message);
  }
};

module.exports = { validatePayload };
