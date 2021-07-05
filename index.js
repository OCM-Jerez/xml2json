const fs = require("fs");
const xml2js = require("xml2js");
const path = require("path");
const StreamZip = require("node-stream-zip");
const parserXml2js = new xml2js.Parser();
const ficheroZIP =
  "C:/Users/pc/Google Drive/OCM/Plataforma de contratacion del sector publico/Datos abiertos/Contratos menores/2021/contratosMenoresPerfilesContratantes_202106.zip";

async function extractZip() {
  const zip = new StreamZip.async({ file: ficheroZIP });

  if (!fs.existsSync("./extracted")) {
    fs.mkdirSync("extracted");
  }

  const count = await zip.extract(null, "./extracted");
  console.log("************** extractZip ********************");
  console.log(`Extracted ${count} entries`);
  await zip.close();
  return Promise.resolve(true);
}

function readFiles(pathSearch) {
  return fs.readdirSync(pathSearch);
}

async function parseXML2JSON() {
  console.log("************** parseXML2JSON inicio ********************");
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
  console.log("************** mapJSON inicio ********************");
  const archivos = readFiles("./extracted/json/");
  if (!fs.existsSync("./extracted/jsonMap")) {
    fs.mkdirSync("extracted/jsonMap");
  }
  const arrayFinal = [];
  let contador =1;
  const count = 569;

  archivos.forEach((fichero) => {
    const liciJson = fs.readFileSync("./extracted/json/" + fichero);
    console.log(`${contador}/${count} ${fichero}`);
    contador ++
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
            SubTypeCode:
              elem["cac-place-ext:ContractFolderStatus"][0][
                "cac:ProcurementProject"
              ][0]["cbc:SubTypeCode"][0]._,
            TotalAmount: Math.trunc(
              elem["cac-place-ext:ContractFolderStatus"][0][
                "cac:ProcurementProject"
              ][0]["cac:BudgetAmount"][0]["cbc:TotalAmount"][0]._
            ),
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
            ReceivedTenderQuantity:
              elem["cac-place-ext:ContractFolderStatus"][0][
                "cac:TenderResult"
              ][0]["cbc:ReceivedTenderQuantity"][0],
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
            UrgencyCode:
              elem["cac-place-ext:ContractFolderStatus"][0][
                "cac:TenderingProcess"
              ][0]["cbc:UrgencyCode"][0]._,
              // listURI: listURI
          };

          arrayFinal.push(item);
        }
      });
  });
  saveFinalJson(arrayFinal);
}

function saveFinalJson(arrayFinal) {
  if (!fs.existsSync("./extracted/jsonFinal")) {
    fs.mkdirSync("extracted/jsonFinal");
  }
  fs.writeFile(
    "./extracted/jsonFinal/jsonfinal.json",
    JSON.stringify(arrayFinal),
    function (err) {
      if (err) throw err;
      // console.log(`${fileNameJson} saved`);
      console.log("************** TERMINADO ********************");
    }
  );
}

async function ejecutaTodo() {
  try {
    await extractZip();
    parseXML2JSON();
    mapJSON();
  } catch (error) {
    console.error(error);
  }
}

ejecutaTodo();
