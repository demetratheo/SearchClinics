const searchClinics = ({clinics, searchParams}) => {
  
  const createAvailabilityDates = (availability, commonDate) => {
    let timeTo = availability.to.split(":");
    let availabilityTo = new Date(commonDate.getTime());
    availabilityTo.setHours(Number(timeTo[0]), Number(timeTo[1]), 0, 0)
  
    let timeFrom = availability.from.split(":");
    let availabilityFrom = new Date(commonDate.getTime());
    availabilityFrom.setHours(Number(timeFrom[0]), Number(timeFrom[1]), 0, 0);
  
    return {from: availabilityFrom, to: availabilityTo};
  }

  const searchConditionTrue = (paramKeys, matchValues) => {
    const commonDate = new Date();
    return paramKeys.every((key) => {
      if (key === "availability") {
        const clinicAvailability = matchValues[key];
        const clinicDates = createAvailabilityDates(clinicAvailability, commonDate);
        const paramDates = createAvailabilityDates(searchParams.availability, commonDate);
        return (paramDates.from.getTime() >= clinicDates.from.getTime()  &&
                paramDates.to.getTime() <= clinicDates.to.getTime());
      }
      return searchParams[key] === matchValues[key];
    }); 
  }

  const searchParamsKeys = searchParams ? Object.keys(searchParams) : [];

  return clinics.filter((clinic) => {
    const values = {
      name: clinic.clinicName || clinic.name,
      state: clinic.stateName || clinic.stateCode,
      availability: clinic.opening || clinic.availability
    };
   
    if(searchParamsKeys.length !== 0) {
      if (searchConditionTrue(searchParamsKeys, values)) {
        return values;
      }
    } else {
      return values;
    }
  });
};

module.exports = {searchClinics};
