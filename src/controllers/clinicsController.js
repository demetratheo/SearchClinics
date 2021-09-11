const {searchClinicsService} = require('../services');
const {getClinicsSchema} = require('./schemas/clinicsSchemas');

const getClinics = async (req, res) => {
  const validated = getClinicsSchema.validate(req.query);
  const {name, state, avalability} = validated.value;

  const response = await searchClinicsService({name, state, avalability});
  console.log(response);
  res.status(200).json(response);
};

module.exports = {getClinics};
