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
    "C:/Users/Usuario/Google Drive/OCM/Plataforma de contratacion del sector publico/Datos abiertos/licitaciones/2021/licitacionesPerfilesContratanteCompleto3_202107.zip";
// "C:/Users/Usuario/Google Drive/OCM/Plataforma de contratacion del sector publico/Datos abiertos/Contratos menores/2020/contratosMenoresPerfilesContratantes_2020.zip";
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

    if (!fs.existsSync("./resultados")) {
        fs.mkdirSync("resultados");
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

                    let durationMeasure = "Sin dato";
                    let unitCode = "Sin dato";

                    const cacProcurementProject = contractFolderStatus["cac:ProcurementProject"] && contractFolderStatus["cac:ProcurementProject"][0] ? contractFolderStatus["cac:ProcurementProject"][0] : null;
                    const cacPlannedPeriod = cacProcurementProject ? cacProcurementProject["cac:PlannedPeriod"] : null;
                    const cbcDurationMeasure = cacPlannedPeriod ? cacPlannedPeriod[0]["cbc:DurationMeasure"] : null;
                    const valuesDurationMeasure = cbcDurationMeasure ? cbcDurationMeasure[0] : null;

                    if (valuesDurationMeasure) {
                        durationMeasure = valuesDurationMeasure._;
                        unitCode = valuesDurationMeasure.$.unitCode;
                    }

                    const cbcContractFolderStatusCode = contractFolderStatus["cbc-place-ext:ContractFolderStatusCode"] ? contractFolderStatus["cbc-place-ext:ContractFolderStatusCode"][0]._ : "Sin dato";
                    const cbcName = cacProcurementProject && cacProcurementProject["cbc:Name"] ? cacProcurementProject["cbc:Name"][0] : "Sin dato";
                    const cbcTypeCode = cacProcurementProject && cacProcurementProject["cbc:TypeCode"] ? cacProcurementProject["cbc:TypeCode"][0]._ : "Sin dato";
                    const cbcSubTypeCode = cacProcurementProject && cacProcurementProject["cbc:SubTypeCode"] ? cacProcurementProject["cbc:SubTypeCode"][0]._ : "Sin dato";
                    const cacBudgetAmount = cacProcurementProject && cacProcurementProject["cac:BudgetAmount"] ? cacProcurementProject["cac:BudgetAmount"] : null;
                    let cbcTotalAmount = "Sin dato";
                    let cbcTaxExclusiveAmount = "Sin dato";

                    if (cacBudgetAmount) {
                        cbcTotalAmount = cacBudgetAmount[0]["cbc:TotalAmount"] ? Math.trunc(cacBudgetAmount[0]["cbc:TotalAmount"][0]._) : "Sin dato";
                        cbcTaxExclusiveAmount = cacBudgetAmount[0]["cbc:TaxExclusiveAmount"] ? Math.trunc(cacBudgetAmount[0]["cbc:TaxExclusiveAmount"][0]._) : "Sin dato";
                    }

                    // let listURI = "Sin dato";
                    // const aAdditionalPublicationStatus = contractFolderStatus["cac:place-ext:ValidNoticeInfo"] ? contractFolderStatus["cac:place-ext:ValidNoticeInfo"][0]["cac-place-ext:AdditionalPublicationStatus"] : null;
                    // const AdditionalPublicationDocumentReference = aAdditionalPublicationStatus ? aAdditionalPublicationStatus[0]["cac-place-ext:AdditionalPublicationDocumentReference"] : null;
                    // const cboDocumentTypeCode = AdditionalPublicationDocumentReference ? AdditionalPublicationDocumentReference[0]["cbc:DocumentTypeCode"] : null;
                    // const valuesDocumentTypeCode = cboDocumentTypeCode ? cboDocumentTypeCode[0] : null;

                    // if (valuesDocumentTypeCode) {
                    //     listURI = valuesDocumentTypeCode.$.listURI
                    // }

                    const cbcUrgencyCode = contractFolderStatus["cac:TenderingProcess"] && contractFolderStatus["cac:TenderingProcess"][0]["cbc:UrgencyCode"]
                        ? contractFolderStatus["cac:TenderingProcess"][0]["cbc:UrgencyCode"]._
                        : "Sin dato"

                    itemArray.ContractFolderStatusCode = cbcContractFolderStatusCode;
                    itemArray.Name = cbcName;
                    itemArray.TypeCode = cbcTypeCode;
                    itemArray.SubTypeCode = cbcSubTypeCode;
                    itemArray.TotalAmount = cbcTotalAmount;
                    itemArray.TaxExclusiveAmount = cbcTaxExclusiveAmount;
                    itemArray.DurationMeasure = durationMeasure;
                    itemArray.unitCode = unitCode;
                    // itemArray.listURI = listURI;
                    itemArray.UrgencyCode = cbcUrgencyCode;


                    if (cacTenderResult) {
                        const arrayTenderResult = [];
                        // Ver ejemplo.atom a partir linea 7511
                        cuantosArray = Object.keys(cacTenderResult).length;
                        for (var i = 0; i < cuantosArray; i++) {

                            let partyIdentification = "Sin dato";
                            let partyName = "Sin dato";

                            const cacWinningParty = cacTenderResult[i] ? cacTenderResult[i]["cac:WinningParty"] : null;
                            if (cacWinningParty) {
                                const cbcId = cacWinningParty[0]["cac:PartyIdentification"] ? cacWinningParty[0]["cac:PartyIdentification"][0]["cbc:ID"] : null;
                                partyIdentification = cbcId ? cbcId[0]._ : 'Sin dato';

                                const cbcName = cacWinningParty[0]["cac:PartyName"] ? cacWinningParty[0]["cac:PartyName"][0]["cbc:Name"] : null;
                                partyName = cbcName ? cbcName[0] : "Sin dato"
                            }

                            const cacLegalMonetaryTotal = cacTenderResult[i]["cac:AwardedTenderedProject"] ? cacTenderResult[i]["cac:AwardedTenderedProject"][0]["cac:LegalMonetaryTotal"] : null;
                            const cbcPayableAmount = cacLegalMonetaryTotal ? cacLegalMonetaryTotal[0]["cbc:PayableAmount"] : null;
                            const cbcTaxExclusiveAmount = cacLegalMonetaryTotal ? cacLegalMonetaryTotal[0]["cbc:TaxExclusiveAmount"] : null;

                            const taxExclusiveAmount = cbcTaxExclusiveAmount ? Math.trunc(cbcTaxExclusiveAmount[0]._) : "Sin dato";
                            const payableAmount = cbcPayableAmount ? Math.trunc(cbcPayableAmount[0]._) : "Sin dato";

                            const resultCode = cacTenderResult[i]["cbc:ResultCode"] ? cacTenderResult[i]["cbc:ResultCode"][0]._ : "Sin dato";
                            const awardDate = cacTenderResult[0]["cbc:AwardDate"] ? cacTenderResult[0]["cbc:AwardDate"][0] : "Sin dato";
                            const receivedTenderQuantity = cacTenderResult[0]["cbc:ReceivedTenderQuantity"] ? cacTenderResult[0]["cbc:ReceivedTenderQuantity"][0] : "Sin dato";

                            const item = {
                                ResultCode: resultCode,
                                AwardDate: awardDate,
                                ReceivedTenderQuantity: receivedTenderQuantity,
                                PartyIdentification: partyIdentification,
                                PartyName: partyName,
                                TaxExclusiveAmount: taxExclusiveAmount,
                                PayableAmount: payableAmount,
                            };

                            arrayTenderResult.push(item);
                        }

                        itemArray.arrayTenderResult = arrayTenderResult;
                    }
                }

                arrayFinal.push(itemArray);
            });

    });

    saveFinalJson(arrayFinal);

    const stop = Date.now()
    this.timeMapJSON = ((stop - start) / 60000).toFixed(2)
}

function viewRepeat(arrayFinal) {
    const listRepeat = [];
    const listNoRepeat = [];
    const listRepeatMajor = [];

    arrayFinal.forEach(item => {
        const data = arrayFinal.filter(filterItem => item.ContractFolderID.search(filterItem.ContractFolderID) > -1);

        if (data.length > 1) {
            listRepeat.push(item);
        } else {
            listNoRepeat.push(item);
        }
    });

    listRepeat.forEach(item => {
        const itemMajor = listRepeatMajor.find(findItem => findItem.ContractFolderID.includes(item.ContractFolderID));
        if (itemMajor === undefined) {
            const data = listRepeat.filter(filterItem => filterItem.ContractFolderID.includes(item.ContractFolderID));

            const major = data.reduce((prev, current) => {
                const dateItemPrev = new Date(prev.updated);
                const dateItemCurrent = new Date(current.updated);

                return dateItemPrev > dateItemCurrent ? prev : current
            });

            listRepeatMajor.push(major);
            listNoRepeat.push(major);
        }

    });


    fs.writeFile(
        "./resultados/repeat.json",
        JSON.stringify(listRepeat),
        function (err) {
            if (err) throw err;
            console.log(listRepeat.length);
            console.log("************** TERMINADO repeat.json ********************");
        }
    );

    fs.writeFile(
        "./resultados/repeatMajor.json",
        JSON.stringify(listRepeatMajor),
        function (err) {
            if (err) throw err;
            console.log(listRepeatMajor.length);
            console.log("************** TERMINADO repeatMajor.json ********************");
        }
    );
    fs.writeFile(
        "./resultados/finalNoRepeat.json",
        JSON.stringify(listNoRepeat),
        function (err) {
            if (err) throw err;
            console.log(listNoRepeat.length);
            console.log("************** TERMINADO finalNoRepeat.json ********************");
        }
    );
}

function saveFinalJson(arrayFinal) {
    // const countLinesJSON = await readLines("./jsonfinal.json");
    fs.rmdir("./extracted", { recursive: true },
        (error) => {
            console.error("Error: ", error);
        })

    fs.writeFile(
        "./resultados/final.json",
        JSON.stringify(arrayFinal),
        function (err) {
            if (err) throw err;
            console.log("************** TERMINADO ********************");
            console.log(`Time taken to execute extractZip()    = ${this.timeExtractZip} minutes`);
            console.log(`Time taken to execute parseXML2JSON() = ${this.timeParseXML2JSON} minutes`);
            console.log(`Time taken to execute mapJSON()       = ${this.timeMapJSON} minutes`);
            console.log(`Total XML lines                       = ${new Intl.NumberFormat('es-Es').format(this.totalLines)}`);
            console.log(`Total licitaciones encontradas:       = ${arrayFinal.length}`);
            // console.log(`Total licitaciones sin repeticiones:  = ${this.listNoRepeat.length}`);
            // console.log(`Total JSON lines                      = ${new Intl.NumberFormat('es-Es').format(279)}`);
        }
    );

    viewRepeat(arrayFinal);
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

