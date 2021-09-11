const {provider1} = require('../infrastructure');

const searchClinicsService = async (params) => {

  // get from provider 1
  // get from provider 2
  console.log(params);

  return await provider1();
};

module.exports = searchClinicsService;
