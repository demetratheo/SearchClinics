const express = require('express');
const routes = require('./routes');

const app = express();
const port = 3000;

// app.use(require('cors')());

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

app.use(routes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
