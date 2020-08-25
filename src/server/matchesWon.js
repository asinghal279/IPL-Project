function matchesWon(data) {
  let obj = data
    .map((el) => [el.season, el.winner])
    .reduce((acc, curr) => {
      let year = curr[0];
      let winner = curr[1];
      if (acc[year]) {
        if (acc[year].hasOwnProperty(winner)) {
          acc[year][winner]++;
        } else {
          if (winner != "") acc[year][winner] = 1;
        }
      } else {
        acc[year] = {};
        if (winner != "") acc[year][winner] = 1;
      }
      return acc;
    }, {});
  // console.log(obj);
  return obj;
}

module.exports = matchesWon;
