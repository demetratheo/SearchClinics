const express = require('express');
const routes = require('./routes');

const start = () => {
  const app = express();
  const port = 3000;

  app.use(routes);

  app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
  });
}

start();
