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
    "C:/Users/Usuario/Google Drive/OCM/Plataforma de contratacion del sector publico/Datos abiertos/Contratos menores/2020/contratosMenoresPerfilesContratantes_2020.zip";
// "C:/Users/Usuario/Google Drive/OCM/Plataforma de contratacion del sector publico/Datos abiertos/licitaciones/2021/licitacionesPerfilesContratanteCompleto3_202106.zip";
// "C:/Users/Usuario/Google Drive/OCM/Plataforma de contratacion del sector publico/Datos abiertos/licitaciones/2020/PlataformasAgregadasSinMenores_2020.zip";

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
        liciObject.feed.entry
            .filter((itemFilter) =>
                itemFilter.summary[0]._.match(
                    /Junta de Gobierno Local del Ayuntamiento de Jerez/g
                )
            )
            .forEach((elem) => {
                const itemArray = {
                    link:
                        elem.link[0].$.href,

                    summary:
                        elem.summary[0]._,

                    title:
                        elem.title[0],

                    updated:
                        elem.updated[0],
                };


                const contractFolderStatus = elem["cac-place-ext:ContractFolderStatus"][0];
                const cacTenderResult = contractFolderStatus && contractFolderStatus["cac:TenderResult"] ? contractFolderStatus["cac:TenderResult"] : null;

                if (contractFolderStatus) {

                    itemArray.ContractFolderID = contractFolderStatus["cbc:ContractFolderID"][0];

                    if (cacTenderResult) {
                        const arrayTenderResult = [];
                        // Ver ejemplo.atom a partir linea 7511
                        cuantosArray = Object.keys(cacTenderResult).length;
                        for (var i = 0; i < cuantosArray; i++) {

                            let durationMeasure = "Sin dato";
                            let unitCode = "Sin dato";
                            const cacProcurementProject = contractFolderStatus["cac:ProcurementProject"] && contractFolderStatus["cac:ProcurementProject"][0] ? contractFolderStatus["cac:ProcurementProject"][0] : null;
                            const cacPlannedPeriod = cacProcurementProject ? cacProcurementProject["cac:PlannedPeriod"] : null;
                            const cbcDurationMeasure = cacPlannedPeriod ? cacPlannedPeriod[0]["cbc:DurationMeasure"] : null;
                            const valuesDurationMeasure = cbcDurationMeasure ? cbcDurationMeasure[0] : null;

                            if (valuesDurationMeasure) {
                                durationMeasure = valuesDurationMeasure["._"];
                                unitCode = valuesDurationMeasure.$.unitCode;
                            }

                            // const existDurationMeasure =
                            //     contractFolderStatus[
                            //     "cac:ProcurementProject"
                            //     ][0]["cac:PlannedPeriod"][0]["cbc:DurationMeasure"];

                            // if (existDurationMeasure) {
                            //     durationMeasure = existDurationMeasure[0]._;
                            // }


                            // const existUnitcode =
                            //     contractFolderStatus[
                            //     "cac:ProcurementProject"
                            //     ][0]["cac:PlannedPeriod"][0]["cbc:DurationMeasure"];

                            // if (existUnitcode) {
                            //     unitCode = existUnitcode[0].$.unitCode;
                            // }

                            let listURI = "Sin dato";
                            const aAdditionalPublicationStatus = contractFolderStatus["cac:place-ext:ValidNoticeInfo"] ? contractFolderStatus["cac:place-ext:ValidNoticeInfo"][0]["cac-place-ext:AdditionalPublicationStatus"] : null;
                            const AdditionalPublicationDocumentReference = aAdditionalPublicationStatus ? aAdditionalPublicationStatus[0]["cac-place-ext:AdditionalPublicationDocumentReference"] : null;
                            const cboDocumentTypeCode = AdditionalPublicationDocumentReference ? AdditionalPublicationDocumentReference[0]["cbc:DocumentTypeCode"] : null;
                            const valuesDocumentTypeCode = cboDocumentTypeCode ? cboDocumentTypeCode[0] : null;

                            if (valuesDocumentTypeCode) {
                                listURI = valuesDocumentTypeCode.$.listURI
                            }

                            let partyIdentification = "Sin dato";
                            let partyName = "Sin dato";

                            const cacWinningParty = cacTenderResult[i] ? cacTenderResult[i]["cac:WinningParty"] : null;
                            if (cacWinningParty) {
                                const cbcId = cacWinningParty[0]["cac:PartyIdentification"] ? cacWinningParty[0]["cac:PartyIdentification"][0]["cbc:ID"] : null;
                                partyIdentification = cbcId ? cbcId[0]._ : 'Sin dato';

                                const cbcName = cacWinningParty[0]["cac:PartyName"] ? cacWinningParty[0]["cac:PartyName"][0]["cbc:Name"] : null;
                                partyName = cbcName ? cbcName[0] : "Sin dato"
                            }

                            // if (contractFolderStatus["cac:TenderResult"][
                            //     i
                            // ] && contractFolderStatus["cac:TenderResult"][
                            // i
                            // ]["cac:WinningParty"] && contractFolderStatus["cac:TenderResult"][
                            // i
                            // ]["cac:WinningParty"]) {

                            //     if (contractFolderStatus["cac:TenderResult"][
                            //         i
                            //     ]["cac:WinningParty"][0]["cac:PartyIdentification"] && contractFolderStatus["cac:TenderResult"][
                            //     i
                            //     ]["cac:WinningParty"][0]["cac:PartyIdentification"][0][
                            //         "cbc:ID"
                            //         ]) {
                            //         partyIdentification = contractFolderStatus["cac:TenderResult"][
                            //             i
                            //         ]["cac:WinningParty"][0]["cac:PartyIdentification"][0][
                            //             "cbc:ID"
                            //         ][0]._
                            //     }

                            //     if (contractFolderStatus["cac:TenderResult"][
                            //         i
                            //     ]["cac:WinningParty"][0]["cac:PartyName"] && contractFolderStatus["cac:TenderResult"][
                            //     i
                            //     ]["cac:WinningParty"][0]["cac:PartyName"][0][
                            //         "cbc:Name"
                            //         ]) {

                            //         // console.log(JSON.stringify(elem));
                            //         partyName = contractFolderStatus["cac:TenderResult"][
                            //             i
                            //         ]["cac:WinningParty"][0]["cac:PartyName"][0][
                            //             "cbc:Name"
                            //         ][0]
                            //     }

                            // }

                            // let payableAmount = "Sin dato";

                            const cacLegalMonetaryTotal = cacTenderResult[0]["cac:AwardedTenderedProject"] ? cacTenderResult[0]["cac:AwardedTenderedProject"][0]["cac:LegalMonetaryTotal"] : null;
                            const cbcPayableAmount = cacLegalMonetaryTotal ? cacLegalMonetaryTotal[0]["cbc:PayableAmount"] : null;
                            const payableAmount = cbcPayableAmount ? Math.trunc(cbcPayableAmount[0]._) : "Sin dato";

                            // if (contractFolderStatus[
                            //     "cac:TenderResult"
                            // ] && contractFolderStatus[
                            // "cac:TenderResult"
                            // ][0]["cac:AwardedTenderedProject"] && contractFolderStatus[
                            // "cac:TenderResult"
                            // ][0]["cac:AwardedTenderedProject"][0][
                            //     "cac:LegalMonetaryTotal"
                            //     ] && contractFolderStatus[
                            //     "cac:TenderResult"
                            //     ][0]["cac:AwardedTenderedProject"][0][
                            //     "cac:LegalMonetaryTotal"] && [0]["cbc:PayableAmount"]
                            // ) {
                            //     payableAmount = Math.trunc(
                            //         contractFolderStatus[
                            //             "cac:TenderResult"
                            //         ][0]["cac:AwardedTenderedProject"][0][
                            //             "cac:LegalMonetaryTotal"
                            //         ][0]["cbc:PayableAmount"][0]._
                            //     );
                            // }

                            let resultCode = cacTenderResult[0]["cbc:ResultCode"] ? cacTenderResult[0]["cbc:ResultCode"][0]._ : "Sin dato";
                            let awardDate = cacTenderResult[0]["cbc:AwardDate"] ? cacTenderResult[0]["cbc:AwardDate"][0] : "Sin dato";
                            let receivedTenderQuantity = cacTenderResult[0]["cbc:ReceivedTenderQuantity"] ? cacTenderResult[0]["cbc:ReceivedTenderQuantity"][0] : "Sin dato";

                            // if (contractFolderStatus[
                            //     "cac:TenderResult"
                            // ] && contractFolderStatus[
                            //     "cac:TenderResult"
                            //     ]) {

                            //     const tender = contractFolderStatus[
                            //         "cac:TenderResult"
                            //     ][0]["cbc:ResultCode"];

                            //     if (tender) {
                            //         resultCode = tender[0]._;
                            //     }

                            //     const award = contractFolderStatus[
                            //         "cac:TenderResult"
                            //     ][0]["cbc:AwardDate"];

                            //     if (award) {
                            //         awardDate = award[0];
                            //     }


                            //     const quantity = contractFolderStatus[
                            //         "cac:TenderResult"
                            //     ][0]["cbc:ReceivedTenderQuantity"];

                            //     if (quantity) {
                            //         receivedTenderQuantity = quantity[0];
                            //     }

                            // }
                            //const cbcContractFolderID = contractFolderStatus["cbc-place-ext:ContractFolderStatusCode"] ? contractFolderStatus["cbc-place-ext:ContractFolderStatusCode"][0] : "Sin dato";
                            const cbcContractFolderStatusCode = contractFolderStatus["cbc-place-ext:ContractFolderStatusCode"] ? contractFolderStatus["cbc-place-ext:ContractFolderStatusCode"][0]._ : "Sin dato";

                            //const cacProcurementProject = contractFolderStatus["cac:ProcurementProject"] ? contractFolderStatus["cac:ProcurementProject"][0] : null;
                            const cbcName = cacProcurementProject && cacProcurementProject["cbc:Name"] ? cacProcurementProject["cbc:Name"][0] : "Sin dato";
                            const cbcTypeCode = cacProcurementProject && cacProcurementProject["cbc:TypeCode"] ? cacProcurementProject["cbc:TypeCode"][0]._ : "Sin dato";
                            const cbcSubTypeCode = cacProcurementProject && cacProcurementProject["cbc:SubTypeCode"] ? cacProcurementProject["cbc:SubTypeCode"][0]._ : "Sin dato";
                            const cbcBudgetAmount = cacProcurementProject && cacProcurementProject["cbc:BudgetAmount"] ? cacProcurementProject["cbc:BudgetAmount"] : null;
                            const cbcTotalAmount = "Sin dato";
                            const cbcTaxExclusiveAmount = "Sin dato";

                            if (cbcBudgetAmount) {
                                cbcTotalAmount = cbcBudgetAmount[0]["cbc:TotalAmount"] ? Math.trunc(cbcBudgetAmount[0]["cbc:TotalAmount"][0]._) : "Sin dato";
                                cbcTaxExclusiveAmount = cbcBudgetAmount[0]["cbc:TaxExclusiveAmount"] ? Math.trunc(cbcBudgetAmount[0]["cbc:TaxExclusiveAmount"][0]._) : "Sin dato";
                            }

                            const cbcUrgencyCode = contractFolderStatus["cac:TenderingProcess"] && contractFolderStatus["cac:TenderingProcess"][0]["cbc:UrgencyCode"]
                                ? contractFolderStatus["cac:TenderingProcess"][0]["cbc:UrgencyCode"]._
                                : "Sin dato"

                            const item = {
                                ContractFolderStatusCode: cbcContractFolderStatusCode,
                                Name: cbcName,
                                TypeCode: cbcTypeCode,
                                SubTypeCode: cbcSubTypeCode,
                                TotalAmount: cbcTotalAmount,
                                TaxExclusiveAmount: cbcTaxExclusiveAmount,
                                DurationMeasure: durationMeasure,
                                unitCode: unitCode,
                                ResultCode: resultCode,
                                AwardDate: awardDate,
                                ReceivedTenderQuantity: receivedTenderQuantity,
                                PartyIdentification: partyIdentification,
                                PartyName: partyName,
                                PayableAmount: payableAmount,
                                UrgencyCode: cbcUrgencyCode,
                                listURI: listURI
                            };

                            arrayTenderResult.push(item);
                        }

                        itemArray.arrayTenderResult = arrayTenderResult;
                    }
                }

                arrayFinal.push(itemArray);
            });


    });
    console.log("size arrayFinal: ", arrayFinal.length);
    saveFinalJson(arrayFinal);
    const stop = Date.now()
    this.timeMapJSON = ((stop - start) / 60000).toFixed(2)
}

function saveFinalJson(arrayFinal) {
    // const countLinesJSON = await readLines("./jsonfinal.json");
    // fs.rmdir("./extracted", { recursive: true },
    //     (error) => {
    //         console.log(error);
    //     })

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
            // console.log(`Total JSON lines                      = ${new Intl.NumberFormat('es-Es').format(279)}`);
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

