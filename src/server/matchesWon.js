function matchesWon(data)
{
    let obj = data.map(el => [el.season,el.winner]).reduce((acc, curr) => {
        let year = curr[0];
        let winner = curr[1];
        if(acc[year])
        {
            if(acc[year].hasOwnProperty(winner))
            {
                acc[year][winner]++;
            }
            else{
                acc[year][winner]=1;
            }
        }
        else{
            acc[year]={};
        }
        return acc;
    },{});
    return obj;   
}

module.exports = matchesWon;