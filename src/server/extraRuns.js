function extraRuns(matches, deliveries) {
  let matchesin2016 = [];

  matchesin2016 = matches.map((el) => {
    if (el.season == 2016) return el.id;
  });

  let obj = deliveries.reduce((acc, item) => {
    if (matchesin2016.indexOf(item.match_id) > -1) {
      if (acc.hasOwnProperty(item.bowling_team)) {
        acc[item.bowling_team] += parseInt(item.extra_runs);
      } else {
        acc[item.bowling_team] = parseInt(item.extra_runs);
      }
    }
    return acc;
  }, {});

//   console.log(obj);
  return obj;
}

module.exports = extraRuns;
