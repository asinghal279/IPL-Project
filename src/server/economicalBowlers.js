function top10EconomicalBowlers(matches, deliveries) {
  let matchesin2015 = matches
    .filter((match) => match["season"] == 2015)
    .map((match) => parseInt(match["id"]));

  let bowlersData = deliveries.reduce((result, delivery) => {
    if (matchesin2015.indexOf(parseInt(delivery.match_id)) > -1) {
      if (result.hasOwnProperty(delivery.bowler)) {
        result[delivery.bowler][0] += parseInt(delivery.total_runs);
        result[delivery.bowler][1]++;
      } else {
        result[delivery.bowler] = [parseInt(delivery.total_runs), 1];
      }
    }
    return result;
  }, {});

  let arrayWithEconomies = [];

  arrayWithEconomies = Object.keys(bowlersData)
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
  // console.log(arrayWithEconomies);

  return arrayWithEconomies;
}

module.exports = top10EconomicalBowlers;
