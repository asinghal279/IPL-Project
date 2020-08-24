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
    return obj;   
}

module.exports = matchesWon;