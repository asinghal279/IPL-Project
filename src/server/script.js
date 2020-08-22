var fs = require('fs');

var f = fs.readFileSync('./matches.csv', {encoding: 'utf-8'}, 
    function(err){console.log(err);});

f = f.split("\n");

headers = f.shift().split(",");

var json = [];    
f.forEach(function(d){
    tmp = {}
    row = d.split(",")
    for(var i = 0; i < headers.length; i++){
            tmp[headers[i]] = row[i];
    }
    json.push(tmp);
});
json.pop();

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
    return obj;
}
console.log(matchesPlayed(json));