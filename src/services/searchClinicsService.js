const {getVetClinics, getDentalClinics} = require('../infrastructure');

const searchClinicsService = async (params) => {

  console.log(params);
  const vetClinics = await getVetClinics();
  const dentalClinics = await getDentalClinics();

  return {...vetClinics, ...dentalClinics};
};

module.exports = searchClinicsService;
