const express = require('express');
const axios = require('axios');

const router = express.Router();

router.get('/standings/:leagueId/:teamId', async (req, res) => {
  const { leagueId, teamId } = req.params;
  const standings = await axios({
    method: 'GET',
    url: `https://api-football-v1.p.rapidapi.com/v2/leagueTable/${leagueId}`,
    headers: {
      'content-type': 'application/octet-stream',
      'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
      'x-rapidapi-key': '86bda08a13msh4860beadbbecc7fp12d63bjsn22a249dfe060',
      'useQueryString': true,
    },
  });
  const teamsTable = standings.data.api.standings[0];
  res.render('standings', { teamsTable, leagueId, teamId })
});

router.get('/squad/:leagueId/:teamId', async (req, res) => {
  const { leagueId, teamId } = req.params;
  const squad = await axios({
    method: 'GET',
    url: `https://api-football-v1.p.rapidapi.com/v2/players/squad/${teamId}/2020-2021`,
    headers: {
      'content-type': 'application/octet-stream',
      'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
      'x-rapidapi-key': '86bda08a13msh4860beadbbecc7fp12d63bjsn22a249dfe060',
      'useQueryString': true,
    },
  });
  const squadTable = squad.data.api.players;
  res.render('squad', { squadTable, leagueId, teamId });
});

router.get('/:leagueId/:teamId', async (req, res) => {
  const { teamId, leagueId } = req.params;
  const fixturesNext = await axios({
    method: 'GET',
    url: `https://api-football-v1.p.rapidapi.com/v2/fixtures/team/${teamId}/next/1`,
    headers: {
      'content-type': 'application/octet-stream',
      'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
      'x-rapidapi-key': '86bda08a13msh4860beadbbecc7fp12d63bjsn22a249dfe060',
      'useQueryString': true,
    },
  });
  const nextGame = fixturesNext.data.api.fixtures[0];
  res.render('teamInfo', { nextGame, teamId, leagueId });
});

module.exports = router;
