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
    return final_array;
}

module.exports = top10EconomicalBowlers;