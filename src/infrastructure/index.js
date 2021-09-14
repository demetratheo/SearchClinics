const getVetClinics = require("./clinicProviders/getVetClinics");
const getDentalClinics = require("./clinicProviders/getDentalClinics")
const searchClinicsWorker = require("./workers/searchClinicsWorker")
const {searchClinics} = require("./workers/searchClinics")

module.exports = {getVetClinics, getDentalClinics, searchClinicsWorker, searchClinics};
