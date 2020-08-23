var fs = require('fs');


//Reading data from Matches.csv to convert to JSON
var f = fs.readFileSync('../data/matches.csv', {encoding: 'utf-8'}, 
    function(err){console.log(err);});

f = f.split("\n");

headers = f.shift().split(",");

var json = [];    
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
let k = fs.readFileSync('../data/deliveries.csv', {encoding: 'utf-8'}, 
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
    let outPath = '../public/output/matchPerYear.json';
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
    let outPath = '../public/output/matchesWonPerTeamPerYear.json';
    fs.writeFileSync(outPath, JSON.stringify(obj), 'utf8', 
    function(err){console.log(err);});
}

console.log(json);
// matchesPlayed(json);
// matchesWon(json);



