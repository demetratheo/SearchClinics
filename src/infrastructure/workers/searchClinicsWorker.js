const {StaticPool} = require("node-worker-threads-pool");

const {searchClinics} = require("./searchClinics");

const searchClinicsWorker = async(chuncks, searchParams) => {
  const pool = new StaticPool({
    size: Math.ceil(chuncks.length / 2),
    task: searchClinics,
  });
  
  const promises = chuncks.map((chunk) => pool.exec({clinics: chunk, searchParams}).catch((e)=> console.log(e)));

  const result = await Promise.all(promises);
  pool.destroy();
  return result;
}

module.exports = searchClinicsWorker;
