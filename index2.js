var fs = require("fs"),
xml2js = require("xml2js");

let fichero = __dirname + '/contratosMenoresPerfilesContratantes_20210504_041227'

var parser = new xml2js.Parser();
fs.readFile(
  __dirname + "/contratosMenoresPerfilesContratantes_20210504_041227.atom",
  function (err, data) {
    parser.parseString(data, function (err, result) {
      fs.writeFile(
        __dirname + "contratosMenoresPerfilesContratantes_20210504_041227SINPr.json",
        JSON.stringify(result),
        function (err) {
          if (err) throw err;
          console.log("Saved!");
        }
      );
    });
  }
);


let ruta =
  __dirname + "/contratosMenoresPerfilesContratantes_20210504_041227.json";
//  console.log("Ruta: ", ruta);
// lici = fetch('http://C:/Users/pc/contratosMenoresPerfilesContratantes_20210504_041227.json')
let lici = fs.readFileSync(__dirname + "/contratosMenoresPerfilesContratantes_20210504_041227.json");
lici = JSON.parse(lici);
console.log(lici);

const result = lici.map((elem) => {
  if (
    elem.summary[0]._.match(
      /Junta de Gobierno Local del Ayuntamiento de Jerez/g
    )
  ) {
    return {
      summary: elem.summary[0]._,
      title: elem.title[0],
      ContractFolderID:
        elem["cac-place-ext:ContractFolderStatus"][0][
          "cbc:ContractFolderID"
        ][0],
      ContractFolderStatusCode:
        elem["cac-place-ext:ContractFolderStatus"][0][
          "cbc-place-ext:ContractFolderStatusCode"
        ][0]._,
    };
  } else {
    return null;
  }
});

// console.log(JSON.stringify(result));
console.log(result);

fs.writeFile("map.json", JSON.stringify(result), function (err) {
  if (err) throw err;
  console.log("map saved!");
});
