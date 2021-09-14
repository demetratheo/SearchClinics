const express = require("express");
const routes = require("./routes");

const server = () => {
  const app = express();
  const port = 3000;

  app.use(express.json());
  app.use(routes);

  return app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
  });
}

module.exports = server();
