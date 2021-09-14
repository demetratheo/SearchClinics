const nock = require("nock");
const chai = require("chai"), 
      chaiHttp = require("chai-http");

const {vetClinicsData} = require("../data/vetClinics");
const {dentalClinicsData} = require("../data/dentalClinics");
const {dentalClinicsLargeData} = require("../data/dentalClinicsLarge");

chai.use(chaiHttp);
const expect = chai.expect;

describe("GetClinics Endpoint", () => {
  const host = "http://localhost:3000";
  let googleStorageScope;
  before(() => {
    googleStorageScope = nock("https://storage.googleapis.com/scratchpay-code-challenge");
  })

  beforeEach(() => {
    googleStorageScope.get("/vet-clinics.json").reply(200, vetClinicsData);
    googleStorageScope.get("/dental-clinics.json").reply(200, dentalClinicsLargeData);
  })
  
  it("Returns all clinics if no search params are provided", async() => {
    const res = await chai.request(host).post("/");
    expect(res.status).to.be.equal(200);
  });

  it("Returns error if an unknown search param is provided", async() => {
    const res = await chai.request(host).post("/").send({unknownParam: "test"});
    expect(res.status).to.be.equal(400);
  });

  it("Returns all matching clinics with the provided name", async() => {
    const name = "Good Health Home";
    const res = await chai.request(host).post("/").send({name});
    expect(res.status).to.be.equal(200);
    expect(res.body.length).to.not.equal(0);
    res.body.map((clinic) => {
      expect(clinic.name || clinic.clinicName).to.be.equal(name);
    })
  });

  it("Returns 0 matchings if the provided name does not match any data", async() => {
    const name = "Good Health Homesdsad";
    const res = await chai.request(host).post("/").send({name});
    expect(res.status).to.be.equal(200);
    expect(res.body.length).to.be.equal(0);
  });

  it("Returns all matching clinics with the provided state", async() => {
    const state = "California";
    const res = await chai.request(host).post("/").send({state});
    expect(res.status).to.be.equal(200);
    expect(res.body.length).to.not.equal(0);
    res.body.map((clinic) => {
      expect(clinic.stateName || clinic.stateCode).to.be.equal(state);
    })
  });

  it("Returns 0 matchings if the provided state does not match any data", async() => {
    const state = "Califor";
    const res = await chai.request(host).post("/").send({state});
    expect(res.status).to.be.equal(200);
    expect(res.body.length).to.be.equal(0);
  });

  it("Returns all matching clinics with the provided availability times", async() => {
    const availability = {
      from: "10:00",
      to: "11:00"
    };
    let timeFrom = availability.from.split(":");
    const availabilityDateFrom = new Date();
    availabilityDateFrom.setHours(timeFrom[0], timeFrom[1], 0, 0);
    
    let timeTo = availability.to.split(":");
    const availabilityDateTo = new Date(availabilityDateFrom.getTime());
    availabilityDateTo.setHours(timeTo[0], timeTo[1], 0, 0);

    const res = await chai.request(host).post("/").send({availability});

    expect(res.status).to.be.equal(200);
    expect(res.body.length).to.not.equal(0);
    res.body.map((clinic) => {
      const availabilityResponse = clinic.availability || clinic.opening;
      timeFrom = availabilityResponse.from.split(":");
      const responseAvailabilityDateFrom = new Date(availabilityDateFrom.getTime());
      responseAvailabilityDateFrom.setHours(timeFrom[0], timeFrom[1], 0, 0);

      timeTo = availabilityResponse.to.split(":");
      const responseAvailabilityDateTo = new Date(availabilityDateFrom.getTime());
      responseAvailabilityDateTo.setHours(timeTo[0], timeTo[1], 0, 0);

      expect(availabilityDateFrom)
            .to.be.greaterThanOrEqual(responseAvailabilityDateFrom);
      expect(availabilityDateTo)
            .to.be.lessThanOrEqual(responseAvailabilityDateTo);
    })
  });

});
