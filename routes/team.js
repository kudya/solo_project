const express = require('express');
const axios = require('axios');

const router = express.Router();

router.get('/:leagueId/:teamId', async (req, res) => {
  const { teamId, leagueId } = req.params;

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
  // GET X next fixtures by team
  // get("https://api-football-v1.p.rapidapi.com/v2/fixtures/team/{team_id}/next/{number}");
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
  res.render('teamInfo', { teamsTable, nextGame, teamId });
});

module.exports = router;
