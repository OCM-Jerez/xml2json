// Leer ZIP
// Extraer los fichero
// Recorrer los ficeros.
// C: /Users /pc /Google Drive /OCM /Plataforma de contratacion del sector publico /Datos abiertos /Contratos menores /2021

const fs = require("fs");
const xml2js = require("xml2js");
const path = require("path");
const StreamZip = require("node-stream-zip");
const parserXml2js = new xml2js.Parser();
// const fichero =
//   __dirname + "/contratosMenoresPerfilesContratantes_20210519_041443";
const ficheroZIP =
  "C:/Users/pc/Google Drive/OCM/Plataforma de contratacion del sector publico/Datos abiertos/Contratos menores/2021/contratosMenoresPerfilesContratantes_202105.zip";

async function extractZip() {
  //console.log(path.join(__dirname,'/Google Drive/OCM/Plataforma de contratacion del sector publico/Datos abiertos/Contratos menores/2021'))
  const zip = new StreamZip.async({ file: ficheroZIP });

  // await zip.extract('C:/Users/pc/Google Drive/OCM/Plataforma de contratacion del sector publico/Datos abiertos/Contratos menores/2021/');
  if (!fs.existsSync("./extracted")) {
    fs.mkdirSync("extracted");
  }

  const count = await zip.extract(null, "./extracted");

  console.log(`Extracted ${count} entries`);
  await zip.close();

  return Promise.resolve(true);
}

function readFiles(pathSearch) {
  return fs.readdirSync(pathSearch);
}

async function parseXML2JSON() {
  console.log("**************parseXML2JSON********************");
  const archivos = readFiles("./extracted/");

  if (!fs.existsSync("./extracted/json")) {
    fs.mkdirSync("extracted/json");
  }

  archivos.forEach((fichero) => {
    const pathFile = "./extracted/" + fichero;
    if (fs.existsSync(pathFile) && fs.lstatSync(pathFile).isFile()) {
      console.log(pathFile);
      const dataXml = fs.readFileSync(pathFile);

      parserXml2js.parseString(dataXml, function (err, result) {
        if (err) {
          throw err;
        }
        const dataJson = JSON.stringify(result);
        const fileNameJson = fichero.replace(".atom", ".json");

        fs.writeFileSync(`./extracted/json/${fileNameJson}`, dataJson);
      });
    }
  });
}

function mapJSON() {
  const archivos = readFiles("./extracted/json/");
  if (!fs.existsSync("./extracted/jsonMap")) {
    fs.mkdirSync("extracted/jsonMap");
  }
  const arrayFinal=[];

  archivos.forEach((fichero) => {
    const liciJson = fs.readFileSync("./extracted/json/" + fichero);
    const liciObject = JSON.parse(liciJson);

    const result = liciObject.feed.entry
      .filter((itemFilter) =>
        itemFilter.summary[0]._.match(
          /Junta de Gobierno Local del Ayuntamiento de Jerez/g
        )
      )
      .map((elem) => {
        const item={
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
          arrayFinal.push(item);
          return item;
      });
    // if (result.length > 0) {
    //   saveFileJsonMap(result, fichero);
    // }
  });
  saveFinalJson(arrayFinal);
}

function saveFinalJson(arrayFinal){
    if (!fs.existsSync("./extracted/jsonFinal")) {
        fs.mkdirSync("extracted/jsonFinal");
      }
    fs.writeFile(
        "./extracted/jsonFinal/jsonfinal.json",
        JSON.stringify(arrayFinal),
        function (err) {
          if (err) throw err;
          console.log(`${fileNameJson} saved`);
          console.log("Paso 2 ¡Hecho!");
        }
      );
}
function saveFileJsonMap(result, nameFile) {
  const fileNameJson = nameFile.replace(".json", "map.json");

  fs.writeFile(
    "./extracted/jsonMap/" + fileNameJson,
    JSON.stringify(result),
    function (err) {
      if (err) throw err;
      console.log(`${fileNameJson} saved`);
      console.log("Paso 2 ¡Hecho!");
    }
  );
}

async function ejecutaTodo() {
  try {
    await extractZip();

    parseXML2JSON();
    mapJSON();

    // parseXML2JSON();
    // const mapJson=  mapJSON();
    // saveFile(mapJson);
  } catch (error) {
    console.error(error);
  }
}

ejecutaTodo();
