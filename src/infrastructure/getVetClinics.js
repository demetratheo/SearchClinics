const fetch = require("node-fetch");

const getVetClinics = async () => {

  return await fetch("https://storage.googleapis.com/scratchpay-code-challenge/vet-clinics.json")
        .then((res) => res.json());
};

module.exports = getVetClinics;
