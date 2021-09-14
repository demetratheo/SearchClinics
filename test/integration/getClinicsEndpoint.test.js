const nock = require("nock");
const chai = require("chai"), 
      chaiHttp = require("chai-http");

const {vetClinicsData} = require("../data/vetClinics");
const {dentalClinicsData} = require("../data/dentalClinics");
const {createAvailabilityDates} = require("../helpers/createAvailabilityDates");

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
    googleStorageScope.get("/dental-clinics.json").reply(200, dentalClinicsData);
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
    const commonDate = new Date();
    const res = await chai.request(host).post("/").send({availability});
    
    const paramAvailability = createAvailabilityDates(availability, commonDate);
    expect(res.status).to.be.equal(200);
    expect(res.body.length).to.not.equal(0);
    res.body.map((clinic) => {
      const availabilityResponse = clinic.availability || clinic.opening;
      const responseAvailability = createAvailabilityDates(availabilityResponse, commonDate);
      
      expect(paramAvailability.from)
            .to.be.greaterThanOrEqual(responseAvailability.from);
      expect(paramAvailability.to)
            .to.be.lessThanOrEqual(responseAvailability.to);
    })
  });

  it("Returns all matching clinics with all params", async() => {
    const params = {
      name: "Hopkins Hospital Baltimore",
      state: "Florida",
      availability: {
        from: "10:00",
        to: "11:00"
      }
    }
    const commonDate = new Date();
    const res = await chai.request(host).post("/").send(params);
    
    const paramAvailability = createAvailabilityDates(params.availability, commonDate);
    expect(res.status).to.be.equal(200);
    expect(res.body.length).to.be.equal(1);
    res.body.map((clinic) => {
      const availabilityResponse = clinic.availability || clinic.opening;
      const responseAvailability = createAvailabilityDates(availabilityResponse, commonDate);
      
      expect(clinic.stateName || clinic.stateCode).to.be.equal(params.state);
      expect(clinic.name || clinic.clinicName).to.be.equal(params.name);
      expect(paramAvailability.from)
            .to.be.greaterThanOrEqual(responseAvailability.from);
      expect(paramAvailability.to)
            .to.be.lessThanOrEqual(responseAvailability.to);
    })
  });

});
