let fs = require("fs");

function JSON(path) {
  let f = fs.readFileSync(path, { encoding: "utf-8" }, function (err) {
    console.log(err);
  });

  f = f.split("\n");

  let headers = f.shift().split(",");

  let json = [];
  f.forEach(function (d) {
    let tmp = {};
    let row = d.split(",");
    for (let i = 0; i < headers.length; i++) {
      tmp[headers[i]] = row[i];
    }
    json.push(tmp);
  });
  return json;
}

module.exports = JSON;
