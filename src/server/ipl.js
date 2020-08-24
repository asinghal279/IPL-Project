let fs = require('fs');
let path = require('path');
let matchesPlayed = require('./matchesPlayed.js');
let matchesWon = require('./matchesWon.js');
const top10EconomicalBowlers = require('./economicalBowlers.js');
const extraRuns = require('./extraRuns.js');

// Setting the Paths
let matchesPath = path.join(__dirname, '../data/matches.csv');
let deliveriesPath = path.join(__dirname, '../data/deliveries.csv');


//Reading data from Matches.csv to convert to JSON
let f = fs.readFileSync(matchesPath, {encoding: 'utf-8'}, 
    function(err){console.log(err);});

f = f.split("\n");

headers = f.shift().split(",");

let json = [];    
f.forEach(function(d){
    let tmp = {}
    let row = d.split(",")
    for(let i = 0; i < headers.length; i++){
            tmp[headers[i]] = row[i];
    }
    json.push(tmp);
});
json.pop();


// Reading data from deliveries.csv to convert to json
let k = fs.readFileSync(deliveriesPath, {encoding: 'utf-8'}, 
    function(err){console.log(err);});

k = k.split("\n"); 
headers_deliveries = k.shift().split(",");
    
let json_deliveries=[];
k.forEach(function(d){
    let tmp = {};
    let row = d.split(",")
    for(let i = 0; i < headers_deliveries.length; i++){
        tmp[headers_deliveries[i]] = row[i];
    }
    json_deliveries.push(tmp);
});

// console.log(json_deliveries);


let outPath1 = path.join(__dirname,'../public/output/matchPerYear.json');
fs.writeFileSync(outPath1, JSON.stringify(matchesPlayed(json)), 'utf8', 
    function(err){console.log(err);});

let outPath2 = path.join(__dirname,'../public/output/matchesWonPerTeamPerYear.json');
fs.writeFileSync(outPath2, JSON.stringify(matchesWon(json)), 'utf8', 
    function(err){console.log(err);});

let outPath3 = path.join(__dirname,'../public/output/top10EconomicalBowlers.json');
fs.writeFileSync(outPath3, JSON.stringify(top10EconomicalBowlers(json,json_deliveries)), 'utf8', 
    function(err){console.log(err);});

let outPath4 = path.join(__dirname,'../public/output/extraRunsPerTeamin2016.json');
fs.writeFileSync(outPath4, JSON.stringify(extraRuns(json, json_deliveries)), 'utf8', 
    function(err){console.log(err);});





