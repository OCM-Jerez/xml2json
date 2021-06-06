let fs = require("fs");
let xml2js = require("xml2js");
let fichero = __dirname + '/contratosMenoresPerfilesContratantes_20210504_041227'

// No se pueden ehjecutar las dos funciones seguidas, hay que arreglar el json generado
// parseXML2JSON();
// mapJSON();

function parseXML2JSON() {
  var parser = new xml2js.Parser();
  fs.readFile(fichero +'.atom',
    function (err, data) {
      parser.parseString(data, function (err, result) {
        fs.writeFile(fichero +'.json',
          JSON.stringify(result),
          function (err) {
            if (err) throw err;
            console.log(fichero + '.json' ," saved!");
            console.log("HAY QUE SEGUIR PROCEDIMIENTO PARA BORRAR LINEAS");
          }
        );
      });
    }
  );
}

function mapJSON() {
  let lici = fs.readFileSync(fichero +'.json');
lici = JSON.parse(lici);

  const result = lici.map((elem, index) => {
        return {
        summary: elem.author[0].name,
        id: elem.entry[0].id[index],
                };
    });
  // console.log(JSON.stringify(result));
  // console.log(result);
  saveFile(result);
}

function saveFile(result) {
  fs.writeFile('prueba' + 'map' + '.json', JSON.stringify(result), function (err) {
    if (err) throw err;
    console.log(fichero + 'map' + '.json' ," saved!");
    console.log('BORRAR NULL');
  });
}


let objCompleto = fs.readFileSync('contratosMenoresPerfilesContratantes_20210513_041419_1' +'.json');
objCompleto = JSON.parse(objCompleto);

let { entry } = objCompleto.feed

const result = entry.map((elem) => {
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
    });
 
  saveFile(result);


console.log('entry data', entry)