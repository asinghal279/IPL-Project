function matchesPlayed(data){
    let obj = data.map((el) => el.season).reduce((acc, curr) => {
        if(acc[curr])
        {
            acc[curr]++;
        }
        else
        {
            acc[curr]=1;
        }
        return acc;
    },{})
    return obj;
}

module.exports = matchesPlayed
