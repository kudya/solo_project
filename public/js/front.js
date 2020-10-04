const country = document.getElementById('countryForm');
const leagueContainer = document.getElementById('leagueContainer');
const teamsContainer = document.getElementById('teamsContainer');
const teamInfoButtons = document.getElementById('teamInfoButtons');
const teamInfoContainer = document.getElementById('teamInfoContainer');
const advice = document.getElementById('advice');
const ctx = document.getElementById('myChart');

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
  if (event.target.teamInfoButtons.id === 'previousGame') {
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
  }
  if (event.target.teamInfoButtons.id === 'predictions') {
    const fixtureId = event.target.teamInfoButtons.dataset.fixtureId;
    const resp = await fetch(`https://api-football-v1.p.rapidapi.com/v2/predictions/${fixtureId}`, {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
        'x-rapidapi-key': '86bda08a13msh4860beadbbecc7fp12d63bjsn22a249dfe060',
      },
    });
    const result = await resp.json();
    const fixturePrediction = result.api.predictions[0];
    console.log(fixturePrediction);
    // const previousGames = result.api.fixtures;
    // const refreshPage = await fetch('/hbs/previousGames.hbs');
    // const template = await refreshPage.text();
    // const render = Handlebars.compile(template);
    // const htmlRefreshPage = render({ previousGames });
    // teamInfoContainer.innerHTML = htmlRefreshPage;

    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Strength', 'Att Potential', 'Def Potential', 'Poisson Distribution', 'Str H2H', 'Goals H2H', 'Wins the Game'],
        datasets: [{
          label: fixturePrediction.teams.home.team_name,
          data: [
            parseInt(fixturePrediction.comparison.forme.home),
            parseInt(fixturePrediction.comparison.att.home),
            parseInt(fixturePrediction.comparison.def.home),
            parseInt(fixturePrediction.comparison.fish_law.home),
            parseInt(fixturePrediction.comparison.h2h.home),
            parseInt(fixturePrediction.comparison.goals_h2h.home),
            parseInt(fixturePrediction.winning_percent.home),
          ],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 99, 132, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 99, 132, 1)',
          ],
          borderWidth: 1,
        },
        {
          label: fixturePrediction.teams.away.team_name,
          data: [
            parseInt(fixturePrediction.comparison.forme.away),
            parseInt(fixturePrediction.comparison.att.away),
            parseInt(fixturePrediction.comparison.def.away),
            parseInt(fixturePrediction.comparison.fish_law.away),
            parseInt(fixturePrediction.comparison.h2h.away),
            parseInt(fixturePrediction.comparison.goals_h2h.away),
            parseInt(fixturePrediction.winning_percent.away),
          ],
          backgroundColor: [
            'rgba(54, 162, 235, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(54, 162, 235, 0.2)',
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(54, 162, 235, 1)',
          ],
          borderWidth: 1,
        },
        ],
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
            },
          }],
        },
      },
    });
    advice.innerHTML = `<h4>Prediction advice: "${fixturePrediction.advice}"<h4>`;
  }
  if (event.target.teamInfoButtons.id === 'odds') {
    const fixtureId = event.target.teamInfoButtons.dataset.fixtureId;
    const resp = await fetch(`https://api-football-v1.p.rapidapi.com/v2/odds/fixture/${fixtureId}`, {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
        'x-rapidapi-key': '86bda08a13msh4860beadbbecc7fp12d63bjsn22a249dfe060',
      },
    });
    const result = await resp.json();
    const fixtureOdds = result.api.odds[0].bookmakers;

    const topFiveBookmakers = [
      {
        bookmaker: fixtureOdds[0].bookmaker_name,
        home: fixtureOdds[0].bets[0].values[0].odd,
        draw: fixtureOdds[0].bets[0].values[1].odd,
        away: fixtureOdds[0].bets[0].values[2].odd,
      },
      {
        bookmaker: fixtureOdds[1].bookmaker_name,
        home: fixtureOdds[1].bets[0].values[0].odd,
        draw: fixtureOdds[1].bets[0].values[1].odd,
        away: fixtureOdds[1].bets[0].values[2].odd,
      },
      {
        bookmaker: fixtureOdds[2].bookmaker_name,
        home: fixtureOdds[2].bets[0].values[0].odd,
        draw: fixtureOdds[2].bets[0].values[1].odd,
        away: fixtureOdds[2].bets[0].values[2].odd,
      },
      {
        bookmaker: fixtureOdds[3].bookmaker_name,
        home: fixtureOdds[3].bets[0].values[0].odd,
        draw: fixtureOdds[3].bets[0].values[1].odd,
        away: fixtureOdds[3].bets[0].values[2].odd,
      },
      {
        bookmaker: fixtureOdds[4].bookmaker_name,
        home: fixtureOdds[4].bets[0].values[0].odd,
        draw: fixtureOdds[4].bets[0].values[1].odd,
        away: fixtureOdds[4].bets[0].values[2].odd,
      },
    ];

    // const oddsArr = [];
    // const obj = {};
    // for (let i = 0; i < fixtureOdds.length; i += 1) {
    //   console.log(fixtureOdds[i]);
    //   obj.bookmaker = fixtureOdds[i].bookmaker_name;
    //   obj.home = fixtureOdds[i].bets[0].values[0].odd;
    //   obj.draw = fixtureOdds[i].bets[0].values[1].odd;
    //   obj.away = fixtureOdds[i].bets[0].values[2].odd;
    //   oddsArr.push(obj);
    // }
    // console.log('!!!!!!!!', oddsArr);

    const refreshPage = await fetch('/hbs/odds.hbs');
    const template = await refreshPage.text();
    const render = Handlebars.compile(template);
    const htmlRefreshPage = render({ topFiveBookmakers });
    teamInfoContainer.innerHTML = htmlRefreshPage;
  }
});







//-------------TEAM-------------
// FIXTURES
// GET X next fixtures by team
// get("https://api-football-v1.p.rapidapi.com/v2/fixtures/team/{team_id}/next/{number}");

// GET X last fixtures by team
// get("https://api-football-v1.p.rapidapi.com/v2/fixtures/team/{team_id}/last/{number}");

// PREDICTIONS
// GET By fixture
// get("https://api-football-v1.p.rapidapi.com/v2/predictions/{fixture_id}");

// ODDS
// Get all available odds from one {fixture_id}
// get("https://api-football-v1.p.rapidapi.com/v2/odds/fixture/{fixture_id}");

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

