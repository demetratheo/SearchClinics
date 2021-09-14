const joi = require("joi");

const TIME_SCHEMA = joi.string().trim()
                      .regex(/^([0-9]{2})\:([0-9]{2})$/)
                      .message("The time format should be HH:MM");

const getClinicsSchema = joi.object({
  name: joi.string().trim(),
  state: joi.string().trim(),
  availability: joi.object({
    from: TIME_SCHEMA.required(),
    to: TIME_SCHEMA.required(),
  })
});

module.exports = {getClinicsSchema};
