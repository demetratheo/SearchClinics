let server;

before(() => {
  server = require("../../src/server");
});

after(() => {
  server.close();
});
