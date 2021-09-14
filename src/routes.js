const express = require("express");
const {clinicsController} = require("./controllers");

const router = express.Router();

router.post("/", clinicsController.getClinics);

module.exports = router;
