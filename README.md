# SearchClinics


### Start the api ###

* Docker: docker-compose up
* Local machine: npm run start OR yarn

### Run tests ###

* Local machine: npm run test OR yarn test

### Api endpoints ###

* POST http://localhost:5000/  body: {name, state, availability:{from, to}}

### Test coverage ###
Formula: (testCodeLines / srcCodeLines) * 100
* (118 / 160) * 100 = 73.75% test coverage

### Additional comments ###
  
 For performance purposes, in order to not block the main app's thread in case of large datasets (since DB is not allowed in this project). I have used the nodejs worker_threads library along with the 'node-worker-threads-pool' npm package. So in case of a large datasets the api will split the data in to smaller chunks and process the data in worker threads.
