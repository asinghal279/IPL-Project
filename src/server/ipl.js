function matchesPlayed(data) {
  return data
    .map((match) => match.season)
    .reduce((result, season) => {
      if (result[season]) {
        result[season]++;
      } else {
        result[season] = 1;
      }
      return result;
    }, {});
}

function matchesWon(data) {
  return data
    .map((match) => [match.season, match.winner])
    .reduce((result, matchInfo) => {
      let year = matchInfo[0];
      let winner = matchInfo[1];
      if (result[year]) {
        if (result[year].hasOwnProperty(winner)) {
          result[year][winner]++;
        } else {
          if (winner != "") result[year][winner] = 1;
        }
      } else {
        result[year] = {};
        if (winner != "") result[year][winner] = 1;
      }
      return result;
    }, {});
}

function extraRunsPerTeam(matches, deliveries, year) {
  let matchesIn2016 = matches
    .filter((match) => match.season == year)
    .map((match) => match.id);

  return deliveries.reduce((acc, delivery) => {
    if (matchesIn2016.indexOf(delivery.match_id) > -1) {
      if (acc.hasOwnProperty(delivery.bowling_team)) {
        acc[delivery.bowling_team] += parseInt(delivery.extra_runs);
      } else {
        acc[delivery.bowling_team] = parseInt(delivery.extra_runs);
      }
    }
    return acc;
  }, {});
}

function top10EconomicalBowlers(matches, deliveries, year) {
  let matchesIn2015 = matches
    .filter((match) => match["season"] == year)
    .map((match) => parseInt(match["id"]));

  let bowlersData = deliveries.reduce((result, delivery) => {
    if (matchesIn2015.indexOf(parseInt(delivery.match_id)) > -1) {
      if (result.hasOwnProperty(delivery.bowler)) {
        result[delivery.bowler][0] = result[delivery.bowler][0] + parseInt(delivery.total_runs) - parseInt(delivery.legbye_runs) - parseInt(delivery.bye_runs);
        result[delivery.bowler][1]++;
      } else {
        result[delivery.bowler] = [parseInt(delivery.total_runs), 1];
      }
    }
    return result;
  }, {});

  return Object.keys(bowlersData)
    .map((bowler) => {
      let overs = bowlersData[bowler][1] / 6;
      let total = bowlersData[bowler][0];
      let economy = total / overs;
      return [bowler, economy];
    })
    .sort((a, b) => {
      return a[1] - b[1];
    })
    .reduce((acc, bowler) => {
      return acc.concat(bowler[0]);
    }, [])
    .slice(0, 10);
}

module.exports = {
  matchesPlayed,
  matchesWon,
  extraRunsPerTeam,
  top10EconomicalBowlers,
};
