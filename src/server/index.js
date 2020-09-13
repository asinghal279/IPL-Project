let path = require("path");
let csvtojson = require("./csvToJson");
let ipl = require("./ipl");
const matchesPlayed = ipl.matchesPlayed;
const matchesWon = ipl.matchesWon;
const top10EconomicalBowlers = ipl.top10EconomicalBowlers;
const extraRuns = ipl.extraRunsPerTeam;
const highestdismissals = ipl.highestDismisals;
let createOutput = require("./createOutput");

// Setting the Paths to CSV
let matchesPath = path.join(__dirname, "../data/matches.csv");
let deliveriesPath = path.join(__dirname, "../data/deliveries.csv");

//convert to JSON
let matches_json = csvtojson(matchesPath);
matches_json.pop();
let deliveries_json = csvtojson(deliveriesPath);
// console.log(deliveries_json);

const year1 = 2015;
const year2 = 2016;

// Setting the paths to OutputFiles
let outPath1 = path.join(__dirname, "../public/output/matchPerYear.json");
let outPath2 = path.join(
  __dirname,
  "../public/output/matchesWonPerTeamPerYear.json"
);
let outPath3 = path.join(
  __dirname,
  `../public/output/top10EconomicalBowlersIn${year1}.json`
);
let outPath4 = path.join(
  __dirname,
  `../public/output/extraRunsPerTeamIn${year2}.json`
);
let outPath5 = path.join(
  __dirname,
  "../public/output/mostDismissalsOfaPlayerByOther.json"
);
// Creating Output Files with data
createOutput(outPath1, JSON.stringify(matchesPlayed(matches_json)));
createOutput(outPath2, JSON.stringify(matchesWon(matches_json)));
createOutput(
  outPath3,
  JSON.stringify(top10EconomicalBowlers(matches_json, deliveries_json, year1))
);
createOutput(
  outPath4,
  JSON.stringify(extraRuns(matches_json, deliveries_json, year2))
);
createOutput(outPath5, JSON.stringify(highestdismissals(deliveries_json)));
