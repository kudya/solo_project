const country = document.getElementById('countryForm');
const leagueContainer = document.getElementById('leagueContainer');
const teamsContainer = document.getElementById('teamsContainer');
const teamInfoButtons = document.getElementById('teamInfoButtons');
const teamInfoContainer = document.getElementById('teamInfoContainer');

country?.addEventListener('submit', async (event) => {
  event.preventDefault();
  console.log(event.target.countryForm.value);
  const resp = await fetch(`https://api-football-v1.p.rapidapi.com/v2/leagues/country/${event.target.countryForm.value}/2020`, {
    method: 'GET',
    headers: {
      'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
      'x-rapidapi-key': '86bda08a13msh4860beadbbecc7fp12d63bjsn22a249dfe060',
    },
  });
  const result = await resp.json();
  const fnl = result.api.leagues[0];
  const rpl = result.api.leagues[1];

  const refreshPage = await fetch('/hbs/league.hbs');
  const template = await refreshPage.text();
  const render = Handlebars.compile(template);
  const htmlRefreshPage = render({ fnl, rpl });
  leagueContainer.innerHTML = htmlRefreshPage;
});

leagueContainer?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const resp = await fetch(`https://api-football-v1.p.rapidapi.com/v2/teams/league/${event.target.leagueForm.dataset.leagueId}`, {
    method: 'GET',
    headers: {
      'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
      'x-rapidapi-key': '86bda08a13msh4860beadbbecc7fp12d63bjsn22a249dfe060',
    },
  });
  const result = await resp.json();
  const teamsArr = result.api.teams;
  const leagueId = event.target.leagueForm.dataset.leagueId;
  const refreshPage = await fetch('/hbs/teams.hbs');
  const template = await refreshPage.text();
  const render = Handlebars.compile(template);
  const htmlRefreshPage = render({ teamsArr, leagueId });
  teamsContainer.innerHTML = htmlRefreshPage;
});

teamsContainer?.addEventListener('submit', (event) => {
  event.preventDefault();
  window.location.assign(`/team/${teamsContainer?.querySelector('div').dataset.leagueId}/${event.target.teamForm.id}`);
});

teamInfoButtons?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const resp = await fetch(`https://api-football-v1.p.rapidapi.com/v2/fixtures/team/${event.target.teamInfoButtons.dataset.teamId}/last/3`, {
    method: 'GET',
    headers: {
      'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
      'x-rapidapi-key': '86bda08a13msh4860beadbbecc7fp12d63bjsn22a249dfe060',
    },
  });
  const result = await resp.json();
  const previousGames = result.api.fixtures;
  const refreshPage = await fetch('/hbs/previousGames.hbs');
  const template = await refreshPage.text();
  const render = Handlebars.compile(template);
  const htmlRefreshPage = render({ previousGames });
  teamInfoContainer.innerHTML = htmlRefreshPage;
});



//-------------TEAM-------------
// FIXTURES
// GET X next fixtures by team
// get("https://api-football-v1.p.rapidapi.com/v2/fixtures/team/{team_id}/next/{number}");

// GET X last fixtures by team
// get("https://api-football-v1.p.rapidapi.com/v2/fixtures/team/{team_id}/last/{number}");

// STATISTICS
// Get all statistics for a { team_id } in a { league_id }
// get("https://api-football-v1.p.rapidapi.com/v2/statistics/{league_id}/{team_id}");

// STANDINGS
// Get all Standings from one { league_id }
// get("https://api-football-v1.p.rapidapi.com/v2/leagueTable/{league_id}");

//-------------PLAYERS-------------
// SQUAD
// GET By team and season
// get("https://api-football-v1.p.rapidapi.com/v2/players/squad/{team_id}/{season}");

// GET By team & season
// get("https://api-football-v1.p.rapidapi.com/v2/players/team/{team_id}/{season}");

// GET By id & season
// get("https://api-football-v1.p.rapidapi.com/v2/players/player/{player_id}/{season}");

