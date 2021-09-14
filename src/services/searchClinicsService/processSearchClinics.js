const {splitArrayToChunks} = require("./splitArrayToChunks");
const {searchClinicsWorker, searchClinics} = require("../../infrastructure");

const processSearchClinics = async(searchParams, vetClinics, dentalClinics) => {
  const chunkSize = 8500;
  if(!Object.keys(searchParams).length){
    return vetClinics.concat(dentalClinics);
  }
  if(vetClinics.length <= chunkSize && dentalClinics.length <= chunkSize) {
    return [vetClinics, dentalClinics].flatMap((clinics) => searchClinics({clinics, searchParams}));
  }
  
  const dataChunks = [vetClinics, dentalClinics].map((clinicsSet)=> {
    if(clinicsSet.length > chunkSize) {
      const chunks = splitArrayToChunks(clinicsSet, chunkSize);
      return chunks.flat();
    } else {
      return clinicsSet;
    }
  });

  const poolResult = await searchClinicsWorker(dataChunks, searchParams);

  return poolResult.flat();
};

module.exports = {processSearchClinics};
