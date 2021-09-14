const {searchClinicsService} = require("../services");
const {getClinicsSchema} = require("./schemas/clinicsSchemas");

const getClinics = async (req, res) => {
  const validated = getClinicsSchema.validate(req.body);
  if(validated.error) {
    return res.status(400).send(validated.error);
  }
  const params = validated.value;
  const response = await searchClinicsService(params);

  return res.status(200).json(response);
};

module.exports = {getClinics};
