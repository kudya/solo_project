const express = require('express');
const axios = require('axios');

const router = express.Router();

router.get('/leagues/:country', async (req, res) => {
  const { country } = req.params;
  const leagues = await axios({
    method: 'GET',
    url: `https://api-football-v1.p.rapidapi.com/v2/leagues/country/${country}/2020`,
    headers: {
      'content-type': 'application/octet-stream',
      'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
      'x-rapidapi-key': process.env.API_TOKEN,
      'useQueryString': true,
    },
  });
  const fnl = leagues.data.api.leagues[0];
  const rpl = leagues.data.api.leagues[1];
  res.send({ fnl, rpl });
});

router.get('/teams/:league', async (req, res) => {
  const { league } = req.params;
  const teams = await axios({
    method: 'GET',
    url: `https://api-football-v1.p.rapidapi.com/v2/teams/league/${league}`,
    headers: {
      'content-type': 'application/octet-stream',
      'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
      'x-rapidapi-key': process.env.API_TOKEN,
      'useQueryString': true,
    },
  });
  const teamsArr = teams.data.api.teams;
  res.send({ teamsArr });
});

module.exports = router;
