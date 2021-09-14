const {getVetClinics, getDentalClinics} = require("../../infrastructure");
const {processSearchClinics} = require("./processSearchClinics");

const searchClinicsService = async (params) => {
  const [vetClinics, dentalClinics] = await Promise.all([
    getVetClinics(),
    getDentalClinics(),
  ])

  return await processSearchClinics(params, vetClinics, dentalClinics);
};

module.exports = {searchClinicsService};
