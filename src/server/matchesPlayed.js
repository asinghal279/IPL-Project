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

module.exports = matchesPlayed
