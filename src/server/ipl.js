function matchesPlayed(matches) {
  return matches
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

function matchesWon(matches) {
  return matches
    .map((match) => ({ year: match.season, winner: match.winner }))
    .reduce((result, { year, winner }) => {
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
  let matchesInYear = matches
    .filter((match) => match.season == year)
    .map((match) => match.id);

  return deliveries.reduce((acc, delivery) => {
    let bowlingTeam = delivery.bowling_team;
    let extraRuns = delivery.extra_runs;
    if (matchesInYear.indexOf(delivery.match_id) > -1) {
      if (acc.hasOwnProperty(bowlingTeam)) {
        acc[bowlingTeam] += parseInt(extraRuns);
      } else {
        acc[bowlingTeam] = parseInt(extraRuns);
      }
    }
    return acc;
  }, {});
}

function top10EconomicalBowlers(matches, deliveries, year) {
  let matchesInYear = matches
    .filter((match) => match["season"] == year)
    .map((match) => parseInt(match["id"]));

  let bowlersData = deliveries.reduce((result, delivery) => {
    let bowlerName = delivery.bowler;
    let totalRunsPerBall = parseInt(delivery.total_runs) - parseInt(delivery.legbye_runs) - parseInt(delivery.bye_runs);
    if (matchesInYear.indexOf(parseInt(delivery.match_id)) > -1) {
      if (result[bowlerName]) {
        result[bowlerName].totalOverallRuns += totalRunsPerBall;
        result[bowlerName].noOfBalls++;
      } else {
        result[bowlerName] = ({totalOverallRuns:  totalRunsPerBall, noOfBalls: 1});
      }
    }
    return result;
  }, {});
  return Object.keys(bowlersData)
    .map((bowler) => {
      let overs = bowlersData[bowler].noOfBalls / 6;
      let total = bowlersData[bowler].totalOverallRuns;
      let economy = total / overs;
      return [bowler, economy];
    })
    .sort((a, b) => {
      return a[1] - b[1];
    })
    .reduce((acc, [bowler, ecomomy]) => {
      return acc.concat(bowler);
    }, [])
    .slice(0, 10);
}

function highestDismisals(deliveries) {
  return Object.entries(
    deliveries
      .filter((bowl) => bowl.player_dismissed != "")
      .reduce((acc, curr) => {
        if (acc[curr.bowler]) {
          if (acc[curr.bowler][curr.batsman]) acc[curr.bowler][curr.batsman]++;
          else acc[curr.bowler][curr.batsman] = 1;
        } else {
          acc[curr.bowler] = {};
          acc[curr.bowler][curr.batsman] = 1;
        }
        return acc;
      }, {})
  )
    .map((array) => {
      return [
        array[0],
        Object.entries(array[1])
          .sort((a, b) => b[1] - a[1])
          .shift(),
      ];
    })
    .sort((a, b) => b[1][1] - a[1][1])
    .shift();
}

module.exports = {
  matchesPlayed,
  matchesWon,
  extraRunsPerTeam,
  top10EconomicalBowlers,
  highestDismisals,
};
