const joi = require('joi');

const getClinicsSchema = joi.object({
  name: joi.string(),
  state: joi.string(),
  avalability: joi.object({
    from: joi.string(),
    to: joi.string(),
  })
});

module.exports = {getClinicsSchema};
