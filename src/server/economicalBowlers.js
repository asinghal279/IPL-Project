function top10EconomicalBowlers(matches, deliveries){
    let matchesin2015 = [];
    
    matchesin2015 = matches.map(item => {
        if(item.season == 2015)
            return item.id;
    })

    let obj = deliveries.reduce((acc, item) => {
        if(matchesin2015.indexOf(item.match_id) > -1)
        {
            if(acc.hasOwnProperty(item.bowler))
            {
                acc[item.bowler][0] += parseInt(item.total_runs);
                acc[item.bowler][1]++;
            }
            else
            {
                acc[item.bowler] = [0,0];
            }
        }
        return acc;
    }, {})

    let arrayWithEconomies = [];
 
    arrayWithEconomies = Object.keys(obj).map((el) => {
        let overs = (obj[el][1])/6;
        let total_runs = obj[el][0];
        let economy = total_runs/overs;
        return [el, economy];
    }).sort((a,b)=>{
        return a[1]-b[1];
    }).reduce((acc, curr) => {
        return acc.concat(curr[0]);
    }, []).slice(0,10);
    console.log(arrayWithEconomies);

    return arrayWithEconomies;
}

module.exports = top10EconomicalBowlers;