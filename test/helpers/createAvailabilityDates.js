const createAvailabilityDates = (availability, commonDate) => {
  let timeTo = availability.to.split(":");
  let availabilityTo = new Date(commonDate.getTime());
  availabilityTo.setHours(Number(timeTo[0]), Number(timeTo[1]), 0, 0)

  let timeFrom = availability.from.split(":");
  let availabilityFrom = new Date(commonDate.getTime());
  availabilityFrom.setHours(Number(timeFrom[0]), Number(timeFrom[1]), 0, 0);

  return {from: availabilityFrom, to: availabilityTo};
}

module.exports = {createAvailabilityDates};
