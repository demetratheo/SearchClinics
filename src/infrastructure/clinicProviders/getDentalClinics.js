const fetch = require("node-fetch");

const getDentalClinics = async () => {
  return await fetch("https://storage.googleapis.com/scratchpay-code-challenge/dental-clinics.json")
        .then((res) => res.json());
};

module.exports = getDentalClinics;
