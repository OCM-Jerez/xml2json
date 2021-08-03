const fs = require("fs");
const xml2js = require("xml2js");
const path = require("path");
const StreamZip = require("node-stream-zip");
const parserXml2js = new xml2js.Parser();
const readLineFile = require('readline');
countFiles = 0;
timeExtractZip = 0;
timeParseXML2JSON = 0;
timeMapJSON = 0;
totalLines = 0;

const ficheroZIP =
  "C:/Users/usuario/Google Drive/OCM/Plataforma de contratacion del sector publico/Datos abiertos/contratos menores/2021/contratosMenoresPerfilesContratantes_202107.zip";
// "C:/Users/usuario/Google Drive/OCM/Plataforma de contratacion del sector publico/Datos abiertos/contratos menores/2020/contratosMenoresPerfilesContratantes_2020.zip";



async function extractZip() {
  const start = Date.now()
  const zip = new StreamZip.async({ file: ficheroZIP });

  if (!fs.existsSync("./extracted")) {
    fs.mkdirSync("extracted");
  }

  if (!fs.existsSync("./extracted/atom")) {
    fs.mkdirSync("extracted/atom");
  }

  zip.on('extract', (entry, file) => {
    console.log(`Extracted ${entry.name} to ${file}`);
  });

  this.countFiles = await zip.extract(null, "./extracted/atom");

  console.log("************** extractZip ********************");
  // console.log(`Extracted ${this.countFiles} entries`);
  const stop = Date.now()
  this.timeExtractZip = ((stop - start) / 60000).toFixed(2)
  // console.log(`Time Taken to execute = ${this.timeExtractZip} minutes`);
  await zip.close();
  return Promise.resolve(true);
}

function readFiles(pathSearch) {
  return fs.readdirSync(pathSearch);
}

async function readLines(name) {
  const pathAtom = __dirname + '/extracted/atom/' + name;
  return new Promise((resolve, reject) => {
    const readInterface = readLineFile.createInterface({
      input: fs.createReadStream(pathAtom),
      ouput: process.stdout,
      console: false
    })
    let count = 0;
    readInterface.on('line', function (line) {
      count++;
    })
    readInterface.on('close', function () {
      resolve(count);
    })
  })
}

async function parseXML2JSON() {
  console.log("************** parseXML2JSON inicio ********************");
  const start = Date.now()
  const archivos = readFiles("./extracted/atom/");
  let contador = 1;
  if (!fs.existsSync("./extracted/json")) {
    fs.mkdirSync("extracted/json");
  }

  for (const fichero of archivos) {
    const pathFile = "./extracted/atom/" + fichero;
    if (fs.existsSync(pathFile) && fs.lstatSync(pathFile).isFile()) {
      const countLines = await readLines(fichero);
      console.log(`${contador}/${this.countFiles} ${fichero} / lineas ${new Intl.NumberFormat('es-Es').format(countLines)}`);
      totalLines = totalLines + countLines;
      contador++
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
  }

  const stop = Date.now()
  this.timeParseXML2JSON = ((stop - start) / 60000).toFixed(2)
  // console.log(`Time Taken to execute = ${this.timeParseXML2JSON} minutes`);
}

function mapJSON() {
  console.log("************** mapJSON inicio ********************");
  const start = Date.now()
  const archivos = readFiles("./extracted/json/");
  // if (!fs.existsSync("./extracted/jsonMap")) {
  //   fs.mkdirSync("extracted/jsonMap");
  // }
  const arrayFinal = [];
  let contador = 1;

  archivos.forEach((fichero) => {
    const liciJson = fs.readFileSync("./extracted/json/" + fichero);
    console.log(`${contador}/${this.countFiles} ${fichero}`);
    contador++
    const liciObject = JSON.parse(liciJson);
    const result = liciObject.feed.entry
      .filter((itemFilter) =>
        itemFilter.summary[0]._.match(
          /Junta de Gobierno Local del Ayuntamiento de Jerez/g
        )
      )
      .map((elem) => {
        ContractFolderID =
          elem["cac-place-ext:ContractFolderStatus"][0][
          "cbc:ContractFolderID"
          ][0];

        cuantosPartyIdentification =
          elem["cac-place-ext:ContractFolderStatus"][0]["cac:TenderResult"];



        cuantosArray = Object.keys(cuantosPartyIdentification).length;
        for (var i = 0; i < cuantosArray; i++) {

          let DurationMeasure = "";
          const existDurationMeasure =
            elem["cac-place-ext:ContractFolderStatus"][0][
            "cac:ProcurementProject"
            ][0]["cac:PlannedPeriod"][0]["cbc:DurationMeasure"];

          if (existDurationMeasure) {
            DurationMeasure = existDurationMeasure[0]._;
          }

          let unitCode = "";
          const existUnitcode =
            elem["cac-place-ext:ContractFolderStatus"][0][
            "cac:ProcurementProject"
            ][0]["cac:PlannedPeriod"][0]["cbc:DurationMeasure"];

          if (existUnitcode) {
            unitCode = existUnitcode[0].$.unitCode;
          }

          // let listURI = "";
          // console.log(i);
          // const existListURI =
          // elem["cac-place-ext:ContractFolderStatus"][0][
          //     "cac:place-ext:ValidNoticeInfo"
          //   ][0]["cac-place-ext:AdditionalPublicationStatus"][0][
          //     "cac-place-ext:AdditionalPublicationDocumentReference"
          //   ][0]["cbc:DocumentTypeCode"];

          //   console.log(existListURI);

          // if (existListURI) {
          //   listURI = existListURI[0].$.listURI;
          // }

          //   DurationMeasure:
          //     elem["cac-place-ext:ContractFolderStatus"][0][
          //       "cac:ProcurementProject"
          //     ][0]["cac:PlannedPeriod"][0]["cbc:DurationMeasure"][0]._,

          //   unitCode:
          //     elem["cac-place-ext:ContractFolderStatus"][0][
          //       "cac:ProcurementProject"
          //     ][0]["cac:PlannedPeriod"][0]["cbc:DurationMeasure"][0].$.unitCode,

          // listURI:
          // elem["cac-place-ext:ContractFolderStatus"][0][
          //   "cac:place-ext:ValidNoticeInfo"
          // ][0]["cac-place-ext:AdditionalPublicationStatus"][0][
          //   "cac-place-ext:AdditionalPublicationDocumentReference"
          // ][0]["cbc:DocumentTypeCode"][0].$.listURI

          const item = {
            link: elem.link[0].$.href,
            summary: elem.summary[0]._,
            title: elem.title[0],
            updated: elem.updated[0],
            ContractFolderID:
              elem["cac-place-ext:ContractFolderStatus"][0][
              "cbc:ContractFolderID"
              ][0],
            ContractFolderStatusCode:
              elem["cac-place-ext:ContractFolderStatus"][0][
                "cbc-place-ext:ContractFolderStatusCode"
              ][0]._,
            Name: elem["cac-place-ext:ContractFolderStatus"][0][
              "cac:ProcurementProject"
            ][0]["cbc:Name"][0],
            TypeCode:
              elem["cac-place-ext:ContractFolderStatus"][0][
                "cac:ProcurementProject"
              ][0]["cbc:TypeCode"][0]._,
            // SubTypeCode:
            //   elem["cac-place-ext:ContractFolderStatus"][0][
            //     "cac:ProcurementProject"
            //   ][0]["cbc:SubTypeCode"][0]._,
            // TotalAmount: Math.trunc(
            //   elem["cac-place-ext:ContractFolderStatus"][0][
            //     "cac:ProcurementProject"
            //   ][0]["cac:BudgetAmount"][0]["cbc:TotalAmount"][0]._
            // ),
            TaxExclusiveAmount: Math.trunc(
              elem["cac-place-ext:ContractFolderStatus"][0][
                "cac:ProcurementProject"
              ][0]["cac:BudgetAmount"][0]["cbc:TaxExclusiveAmount"][0]._
            ),
            DurationMeasure: DurationMeasure,
            unitCode: unitCode,
            ResultCode:
              elem["cac-place-ext:ContractFolderStatus"][0][
                "cac:TenderResult"
              ][0]["cbc:ResultCode"][0]._,
            AwardDate:
              elem["cac-place-ext:ContractFolderStatus"][0][
              "cac:TenderResult"
              ][0]["cbc:AwardDate"][0],
            // ReceivedTenderQuantity:
            //   elem["cac-place-ext:ContractFolderStatus"][0][
            //   "cac:TenderResult"
            //   ][0]["cbc:ReceivedTenderQuantity"][0],
            PartyIdentification:
              elem["cac-place-ext:ContractFolderStatus"][0]["cac:TenderResult"][
                i
              ]["cac:WinningParty"][0]["cac:PartyIdentification"][0][
                "cbc:ID"
              ][0]._,
            PartyName:
              elem["cac-place-ext:ContractFolderStatus"][0]["cac:TenderResult"][
              i
              ]["cac:WinningParty"][0]["cac:PartyName"][0]["cbc:Name"][0],
            TaxExclusiveAmount1: Math.trunc(
              elem["cac-place-ext:ContractFolderStatus"][0][
                "cac:TenderResult"
              ][0]["cac:AwardedTenderedProject"][0][
                "cac:LegalMonetaryTotal"
              ][0]["cbc:TaxExclusiveAmount"][0]._
            ),
            PayableAmount: Math.trunc(
              elem["cac-place-ext:ContractFolderStatus"][0][
                "cac:TenderResult"
              ][0]["cac:AwardedTenderedProject"][0][
                "cac:LegalMonetaryTotal"
              ][0]["cbc:PayableAmount"][0]._
            ),
            ProcedureCode:
              elem["cac-place-ext:ContractFolderStatus"][0][
                "cac:TenderingProcess"
              ][0]["cbc:ProcedureCode"][0]._,
            // UrgencyCode:
            //   elem["cac-place-ext:ContractFolderStatus"][0][
            //     "cac:TenderingProcess"
            //   ][0]["cbc:UrgencyCode"][0]._,
            // listURI: listURI
          };

          arrayFinal.push(item);
        }
      });
  });
  // console.log("size arrayFinal: ", arrayFinal.length);
  saveFinalJson(arrayFinal);
  const stop = Date.now()
  this.timeMapJSON = ((stop - start) / 60000).toFixed(2)
}

function saveFinalJson(arrayFinal) {
  fs.rmdir("./extracted", { recursive: true },
    (error) => {
      console.error("Error: ", error);
    })

  fs.writeFile(
    "./jsonfinal.json",
    JSON.stringify(arrayFinal),
    function (err) {
      if (err) throw err;
      console.log("************** TERMINADO ********************");
      console.log(`Time taken to execute extractZip()    = ${this.timeExtractZip} minutes`);
      console.log(`Time taken to execute parseXML2JSON() = ${this.timeParseXML2JSON} minutes`);
      console.log(`Time taken to execute mapJSON()       = ${this.timeMapJSON} minutes`);
      console.log(`Total XML lines                       = ${new Intl.NumberFormat('es-Es').format(this.totalLines)}`);
      console.log(`Total contratos menores encontrados:  = ${arrayFinal.length}`);
      // console.log(`Total JSON lines                      = ${new Intl.NumberFormat('es-Es').format(279)}`)
    }
  );
}

async function ejecutaTodo() {
  try {
    await extractZip();
    await parseXML2JSON();
    mapJSON();
  } catch (error) {
    console.error("Error: ", error);
  }
}

ejecutaTodo();
