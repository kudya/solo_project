const express = require('express');
const axios = require('axios');
const Chart = require('chart.js');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('index');
});

module.exports = router;
