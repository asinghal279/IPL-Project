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

    return obj;
}

module.exports = extraRuns;