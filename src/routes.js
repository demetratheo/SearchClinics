const express = require('express');
const {clinicsController} = require('./controllers');

const router = express.Router();

router.get('/', clinicsController.getClinics);

module.exports = router;
