const express = require('express');
const axios = require('axios');

const router = express.Router();

router.get('/previous/:teamId', async (req, res) => {
  const { teamId } = req.params;
  const previousGames = await axios({
    method: 'GET',
    url: `https://api-football-v1.p.rapidapi.com/v2/fixtures/team/${teamId}/last/3`,
    headers: {
      'content-type': 'application/octet-stream',
      'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
      'x-rapidapi-key': process.env.API_TOKEN,
      'useQueryString': true,
    },
  });
  let previousGamesArr = previousGames.data.api.fixtures;
  previousGamesArr = previousGamesArr.map((el) => ({
    ...el,
    event_date: new Date(el.event_date).toLocaleString(),
  }));
  res.send({ previousGamesArr });
});

router.get('/predictions/:fixtureId', async (req, res) => {
  const { fixtureId } = req.params;
  const fixturePredictionAPI = await axios({
    method: 'GET',
    url: `https://api-football-v1.p.rapidapi.com/v2/predictions/${fixtureId}`,
    headers: {
      'content-type': 'application/octet-stream',
      'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
      'x-rapidapi-key': process.env.API_TOKEN,
      'useQueryString': true,
    },
  });
  const fixturePrediction = fixturePredictionAPI.data.api.predictions[0];
  res.send({ fixturePrediction });
});

router.get('/odds/:fixtureId', async (req, res) => {
  const { fixtureId } = req.params;
  const fixtureOddsAPI = await axios({
    method: 'GET',
    url: `https://api-football-v1.p.rapidapi.com/v2/odds/fixture/${fixtureId}`,
    headers: {
      'content-type': 'application/octet-stream',
      'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
      'x-rapidapi-key': process.env.API_TOKEN,
      'useQueryString': true,
    },
  });
  const fixtureOdds = fixtureOddsAPI.data.api.odds[0].bookmakers;
  res.send({ fixtureOdds });
});

module.exports = router;
