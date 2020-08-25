let fs = require("fs");

function createOutput(path, data) {
  fs.writeFileSync(path, data),
    "utf8",
    function (err) {
      console.log(err);
    };
}

module.exports = createOutput;
