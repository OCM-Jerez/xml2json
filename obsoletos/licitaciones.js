const fs = require("fs");
const xml2js = require("xml2js");
const StreamZip = require("node-stream-zip");
const parserXml2js = new xml2js.Parser();
const readLineFile = require('readline');
countFiles = 0;
timeExtractZip = 0;
timeParseXML2JSON = 0;
timeMapJSON = 0;
totalLines = 0;

const ficheroZIP =
  //   "C:/Users/pc/Google Drive/OCM/Plataforma de contratacion del sector publico/Datos abiertos/Contratos menores/2020/contratosMenoresPerfilesContratantes_2020.zip";
  // "C:/Users/Usuario/Google Drive/OCM/Plataforma de contratacion del sector publico/Datos abiertos/licitaciones/2021/licitacionesPerfilesContratanteCompleto3_202106.zip";
  "C:/Users/Usuario/Google Drive/OCM/Plataforma de contratacion del sector publico/Datos abiertos/licitaciones/2020/PlataformasAgregadasSinMenores_2020.zip";

// "C:/Users/Usuario/Google Drive/Node.js/xml2json/PlataformasAgregadasSinMenores_2020.zip"
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
  console.log(`Extracted ${this.countFiles} entries`);
  const stop = Date.now()
  this.timeExtractZip = ((stop - start) / 60000).toFixed(2)
  console.log(`Time Taken to execute = ${this.timeExtractZip} minutes`);
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
      //console.log(`${contador}/${this.countFiles} ${fichero} `);

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
  console.log(`Time Taken to execute = ${this.timeParseXML2JSON} minutes`);
}

function mapJSON() {
  console.log("************** mapJSON inicio ********************");
  const start = Date.now()
  const archivos = readFiles("./extracted/json/");
  const arrayFinal = [];
  let contador = 1;

  archivos.forEach((fichero) => {
    const liciJson = fs.readFileSync("./extracted/json/" + fichero);
    console.log(`${contador}/${this.countFiles} ${fichero}`);
    // console.log(`${contador}/522 ${fichero}`);
    contador++
    const liciObject = JSON.parse(liciJson);
    const result = liciObject.feed.entry
      // .filter((itemFilter) =>
      //   itemFilter.summary[0]._.match(
      //     /Junta de Gobierno Local del Ayuntamiento de Jerez/g
      //   )
      // )
      .map((elem) => {
        //TODO! ¿pARA QUE SIRVEN ESTAS LINEAS?
        ContractFolderID =
          elem["cac-place-ext:ContractFolderStatus"][0][
          "cbc:ContractFolderID"
          ][0];

        cuantosPartyIdentification =
          elem["cac-place-ext:ContractFolderStatus"][0]["cac:TenderResult"];

        if (cuantosPartyIdentification) {
          cuantosArray = Object.keys(cuantosPartyIdentification).length;
          for (var i = 0; i < cuantosArray; i++) {

            let durationMeasure = "sin datos";
            const existDurationMeasure =
              elem["cac-place-ext:ContractFolderStatus"][0][
              "cac:ProcurementProject"
              ][0]["cac:PlannedPeriod"][0]["cbc:DurationMeasure"];

            if (existDurationMeasure) {
              durationMeasure = existDurationMeasure[0]._;
            }

            let unitCode = "sin datos";
            const existUnitcode =
              elem["cac-place-ext:ContractFolderStatus"][0][
              "cac:ProcurementProject"
              ][0]["cac:PlannedPeriod"][0]["cbc:DurationMeasure"];

            if (existUnitcode) {
              unitCode = existUnitcode[0].$.unitCode;
            }

            let listURI = "sin datos";

            if (elem["cac-place-ext:ContractFolderStatus"] && elem["cac-place-ext:ContractFolderStatus"][0][
              "cac:place-ext:ValidNoticeInfo"
            ] && elem["cac-place-ext:ContractFolderStatus"][0][
            "cac:place-ext:ValidNoticeInfo"
            ][0]["cac-place-ext:AdditionalPublicationStatus"] && [0]["cac-place-ext:AdditionalPublicationStatus"][0][
              "cac-place-ext:AdditionalPublicationDocumentReference"
              ]) {
              listURI = elem["cac-place-ext:ContractFolderStatus"][0][
                "cac:place-ext:ValidNoticeInfo"
              ][0]["cac-place-ext:AdditionalPublicationStatus"][0][
                "cac-place-ext:AdditionalPublicationDocumentReference"
              ][0]["cbc:DocumentTypeCode"][0].$.listURI
            }

            let partyIdentification = "sin dato";
            let partyName = "sin datos";

            if (elem["cac-place-ext:ContractFolderStatus"][0]["cac:TenderResult"][
              i
            ] && elem["cac-place-ext:ContractFolderStatus"][0]["cac:TenderResult"][
            i
            ]["cac:WinningParty"] && elem["cac-place-ext:ContractFolderStatus"][0]["cac:TenderResult"][
            i
            ]["cac:WinningParty"]) {

              if (elem["cac-place-ext:ContractFolderStatus"][0]["cac:TenderResult"][
                i
              ]["cac:WinningParty"][0]["cac:PartyIdentification"] && elem["cac-place-ext:ContractFolderStatus"][0]["cac:TenderResult"][
              i
              ]["cac:WinningParty"][0]["cac:PartyIdentification"][0][
                "cbc:ID"
                ]) {
                partyIdentification = elem["cac-place-ext:ContractFolderStatus"][0]["cac:TenderResult"][
                  i
                ]["cac:WinningParty"][0]["cac:PartyIdentification"][0][
                  "cbc:ID"
                ][0]._
              }

              if (elem["cac-place-ext:ContractFolderStatus"][0]["cac:TenderResult"][
                i
              ]["cac:WinningParty"][0]["cac:PartyName"] && elem["cac-place-ext:ContractFolderStatus"][0]["cac:TenderResult"][
              i
              ]["cac:WinningParty"][0]["cac:PartyName"][0][
                "cbc:Name"
                ]) {

                // console.log(JSON.stringify(elem));
                partyName = elem["cac-place-ext:ContractFolderStatus"][0]["cac:TenderResult"][
                  i
                ]["cac:WinningParty"][0]["cac:PartyName"][0][
                  "cbc:Name"
                ][0]
              }

            }

            let payableAmount = "sin dato";
            if (elem["cac-place-ext:ContractFolderStatus"][0][
              "cac:TenderResult"
            ] && elem["cac-place-ext:ContractFolderStatus"][0][
            "cac:TenderResult"
            ][0]["cac:AwardedTenderedProject"] && elem["cac-place-ext:ContractFolderStatus"][0][
            "cac:TenderResult"
            ][0]["cac:AwardedTenderedProject"][0][
              "cac:LegalMonetaryTotal"
              ] && elem["cac-place-ext:ContractFolderStatus"][0][
              "cac:TenderResult"
              ][0]["cac:AwardedTenderedProject"][0][
              "cac:LegalMonetaryTotal"] && [0]["cbc:PayableAmount"]
            ) {
              payableAmount = Math.trunc(
                elem["cac-place-ext:ContractFolderStatus"][0][
                  "cac:TenderResult"
                ][0]["cac:AwardedTenderedProject"][0][
                  "cac:LegalMonetaryTotal"
                ][0]["cbc:PayableAmount"][0]._
              );
            }

            let resultCode = "sin dato";
            let awardDate = "sin dato";
            let receivedTenderQuantity = "sin dato";

            if (elem["cac-place-ext:ContractFolderStatus"][0][
              "cac:TenderResult"
            ] && elem["cac-place-ext:ContractFolderStatus"][0][
              "cac:TenderResult"
              ]) {

              const tender = elem["cac-place-ext:ContractFolderStatus"][0][
                "cac:TenderResult"
              ][0]["cbc:ResultCode"];

              if (tender) {
                resultCode = tender[0]._;
              }

              const award = elem["cac-place-ext:ContractFolderStatus"][0][
                "cac:TenderResult"
              ][0]["cbc:AwardDate"];

              if (award) {
                awardDate = award[0];
              }


              const quantity = elem["cac-place-ext:ContractFolderStatus"][0][
                "cac:TenderResult"
              ][0]["cbc:ReceivedTenderQuantity"];

              if (quantity) {
                receivedTenderQuantity = quantity[0];
              }

            }

            const item = {
              link:
                elem.link[0].$.href,

              summary:
                elem.summary[0]._,

              title:
                elem.title[0],

              updated:
                elem.updated[0],

              // En licitaciones esta propiedad no dice nada, es solo un numero.  
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

              TotalAmount:
                Math.trunc(
                  elem["cac-place-ext:ContractFolderStatus"][0][
                    "cac:ProcurementProject"
                  ][0]["cac:BudgetAmount"][0]["cbc:TotalAmount"][0]._
                ),

              TaxExclusiveAmount:
                Math.trunc(
                  elem["cac-place-ext:ContractFolderStatus"][0][
                    "cac:ProcurementProject"
                  ][0]["cac:BudgetAmount"][0]["cbc:TaxExclusiveAmount"][0]._
                ),

              DurationMeasure: durationMeasure,
              unitCode: unitCode,
              ResultCode: resultCode,
              AwardDate: awardDate,
              ReceivedTenderQuantity: receivedTenderQuantity,
              PartyIdentification: partyIdentification,
              PartyName: partyName,
              PayableAmount: payableAmount,

              UrgencyCode:
                elem["cac-place-ext:ContractFolderStatus"][0][
                  "cac:TenderingProcess"
                ][0]["cbc:UrgencyCode"][0]._,
              listURI: listURI
            };

            arrayFinal.push(item);
          }
        }

      });
  });
  saveFinalJson(arrayFinal);
  const stop = Date.now()
  this.timeMapJSON = ((stop - start) / 60000).toFixed(2)
}

function saveFinalJson(arrayFinal) {
  // const countLinesJSON = await readLines("./jsonfinal.json");
  fs.rmdir("./extracted", { recursive: true },
    (error) => {
      console.log(error);
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
      console.log(`Total JSON lines                      = ${new Intl.NumberFormat('es-Es').format(279)}`);
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

