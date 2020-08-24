let fs = require('fs');
let path = require('path');

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



function matchesPlayed(data){
    let obj = {};
    data.forEach(item => {
        if(obj.hasOwnProperty(item.season))
        {
            obj[item.season]++;
        }
        else
        {
            obj[item.season]=1;
        }
    })
    let outPath = path.join(__dirname,'../public/output/matchPerYear.json');
    fs.writeFileSync(outPath, JSON.stringify(obj), 'utf8', 
    function(err){console.log(err);});
}


function matchesWon(data)
{
    let obj = {}
    data.forEach(item => {
        if(obj.hasOwnProperty(item.season))
        {
            if(obj[item.season].hasOwnProperty(item.winner))
            {
                obj[item.season][item.winner]++;
            }
            else
            {
                obj[item.season][item.winner]=1;
            }
        }
        else
        {
            obj[item.season]={};
        }
    })
    let outPath = path.join(__dirname,'../public/output/matchesWonPerTeamPerYear.json');
    fs.writeFileSync(outPath, JSON.stringify(obj), 'utf8', 
    function(err){console.log(err);});
}

function top10EconomicalBowlers(matches, deliveries){
    let matchesin2015 = [];
    let obj = {};
    matches.forEach(item => {
        if(item.season == 2015)
        {
            matchesin2015.push(item.id)
        }
    })
    deliveries.forEach(item => {
        if(matchesin2015.indexOf(item.match_id) > -1)
        {
            if(obj.hasOwnProperty(item.bowler))
            {
                obj[item.bowler][0] += parseInt(item.total_runs);
                obj[item.bowler][1]++;
            }
            else
            {
                obj[item.bowler] = [0,0];
            }
        }
    })
    let arrayWithEconomies = [];
    // console.log(obj);
    for(item in obj){
        let overs = (obj[item][1])/6;
        let total_runs = obj[item][0];
        // console.log(overs);
        let economy = total_runs/overs;
        let nest = [item, economy];
        // console.log(nest);
        arrayWithEconomies.push(nest);
    }

    arrayWithEconomies.sort((a,b)=>{
        return a[1]-b[1];
    })

    // console.log(arrayWithEconomies.slice(0,10));

    let final_array = [];
    for(let i = 0;i< 10;i++)
    {
        final_array.push(arrayWithEconomies[i][0]);
    }

    // console.log(final_array);

    let outPath = path.join(__dirname,'../public/output/top10EconomicalBowlers.json');
    fs.writeFileSync(outPath, JSON.stringify(final_array), 'utf8', 
    function(err){console.log(err);});
}


function extraRuns(matches, deliveries){
    let matchesin2016 = [];
    let obj = {};
    matches.forEach(item => {
        if(item.season == 2016)
        {
            matchesin2016.push(item.id)
        }
    })
    deliveries.forEach(item => {
        if(matchesin2016.indexOf(item.match_id) > -1)
        {
            if(obj.hasOwnProperty(item.batting_team))
            {
                obj[item.batting_team] += parseInt(item.extra_runs);
            }
            else{
                obj[item.batting_team] = 1;
            }
        }
    })

    let outPath = path.join(__dirname,'../public/output/extraRunsPerTeamin2016.json');
    fs.writeFileSync(outPath, JSON.stringify(obj), 'utf8', 
    function(err){console.log(err);});
    console.log(obj);
}


// extraRuns(json, json_deliveries);
// top10EconomicalBowlers(json, json_deliveries);
// console.log(json);
// matchesPlayed(json);
// matchesWon(json);



