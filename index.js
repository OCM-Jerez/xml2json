const fs = require("fs");
const xml2js = require("xml2js");
const StreamZip = require("node-stream-zip");
const parserXml2js = new xml2js.Parser();
const readLineFile = require('readline');
const readline = require('readline-sync');
const path = require('path');

const Common = require('./common');
const commonInstance = new Common();

const SearchRepeat = require('./searchRepeat');
const searchRepeatInstance = new SearchRepeat();

const CIFrepeat = require('./CIFrepeat');
const cifrepeatInstance = new CIFrepeat();

countFiles = 0;
timeExtractZip = 0;
timeParseXML2JSON = 0;
timeMapJSON = 0;
totalLines = 0;
const responseMonth = readline.question('Ingresa el mes con dos cifras, por ejemplo 09-10-11...\n');
const respondeCreateFiles = readline.question('Desea crear los fichero? S/N\n');
const ficheroZIP = "C:/Users/usuario/Google Drive/OCM/Plataforma de contratacion del sector publico/Datos abiertos/FOLDER/2023/PROCCESS_2023MONTH.zip";
// Al finalizar un año no existe el fichero de diciembre. Crean un fichero con el año completo
// const ficheroZIP = "C:/Users/usuario/Google Drive/OCM/Plataforma de contratacion del sector publico/Datos abiertos/FOLDER/2022/PROCCESS_MONTH.zip";

const pathResultsParam = "C:/Users/Usuario/Google Drive/OCM/Plataforma de contratacion del sector publico/Datos abiertos/FOLDER/2023/resultados";
let pathResults = "";
let process = 1;
let jsonFinalProcces = [];

async function extractZip() {
    console.log("************** extractZip  inicio ********************");
    const start = Date.now();

    if (responseMonth) {
        // Se construye la ruta en función de es el primer proceso o el segundo, ademas se sustituye el mes por el que se haya introducido en la consola.
        // Al finalizar un año no existe el fichero de diciembre. Crean un fichero con el año completo
        const ficheroZip = ficheroZIP
            .replace('FOLDER', process == 1 ? "licitaciones" : "contratos menores")
            .replace('PROCCESS', process == 1 ? "licitacionesPerfilesContratanteCompleto3" : "contratosMenoresPerfilesContratantes")
            .replace("MONTH", responseMonth);
        // .replace("MONTH", "2022");
        const zip = new StreamZip.async({ file: ficheroZip });

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
        const stop = Date.now();
        this.timeExtractZip = ((stop - start) / 60000).toFixed(2);
        await zip.close();
        return Promise.resolve(true);
    } else {
        this.responseMonth = readline.question('Ingresa el mes 09-10-11...\n');
        extractZip();
    }

}

async function parseXML2JSON() {
    console.log("************** parseXML2JSON inicio ********************");
    const start = Date.now()
    const archivos = readFiles("./extracted/atom/");
    let contador = 1;
    totalLines = 0;

    if (!fs.existsSync("./extracted/json")) {
        fs.mkdirSync("extracted/json");
    }

    for (const fichero of archivos) {
        const pathFile = "./extracted/atom/" + fichero;
        if (fs.existsSync(pathFile) && fs.lstatSync(pathFile).isFile()) {
            const countLines = await readLines(fichero);
            console.log(`${contador}/${this.countFiles} ${fichero} / lineas ${new Intl.NumberFormat('es-Es').format(countLines)}`);
            totalLines = totalLines + countLines;
            contador++;
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

    const stop = Date.now();
    this.timeParseXML2JSON = ((stop - start) / 60000).toFixed(2);
}

function mapJSON() {
    console.log("************** mapJSON inicio ********************");
    const start = Date.now();
    const archivos = readFiles("./extracted/json/");
    const arrayFinal = [];
    let contador = 1;

    // https://www.oreilly.com/library/view/regular-expressions-cookbook/9781449327453/ch05s02.html
    archivos.forEach((fichero) => {
        const liciJson = fs.readFileSync("./extracted/json/" + fichero);
        console.log(`${contador}/${this.countFiles} ${fichero}`);
        contador++;
        const liciObject = JSON.parse(liciJson);

        liciObject.feed.entry
            .filter((itemFilter) =>
                itemFilter.summary[0]._.match(
                    /\b(?:Junta de Gobierno Local del Ayuntamiento de Jerez|Patronato de la Fundación Centro de Acogida San José|Empresa Municipal de la Vivienda de Jerez|COMUJESA|FUNDARTE|MERCAJEREZ)\b/g
                    // Para comprobar que busca con acentos.
                    // /\b(?:Fundación Computación y Tecnologías Avanzadas de Extremadura)\b/g
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

                    const cacTenderingProcess = contractFolderStatus["cac:TenderingProcess"];

                    const cbcUrgencyCode = cacTenderingProcess && cacTenderingProcess[0]["cbc:UrgencyCode"]
                        ? cacTenderingProcess[0]["cbc:UrgencyCode"][0]._
                        : "Sin dato"

                    const cbcProcedureCode = cacTenderingProcess && cacTenderingProcess[0]["cbc:ProcedureCode"]
                        ? cacTenderingProcess[0]["cbc:ProcedureCode"][0]._
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
                    itemArray.ProcedureCode = cbcProcedureCode;
                    itemArray.UrgencyCode = cbcUrgencyCode;

                    if (cacTenderResult) {
                        const arrayTenderResult = [];
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

    pathResults = pathResultsParam.replace('FOLDER', process == 1 ? "licitaciones" : "contratos menores") + `/${responseMonth}`;
    // Guarda todos los resultados
    saveFinalJson(arrayFinal);
    const stop = Date.now();
    this.timeMapJSON = ((stop - start) / 60000).toFixed(2);
}

async function ejecutaTodo() {
    try {
        if (respondeCreateFiles.toUpperCase() === 'S') {
            for (let index = 0; index < 2; index++) {
                await extractZip();
                await parseXML2JSON();
                mapJSON();
                process = 2;
            }
        }

        mergeJsonFinal();

    } catch (error) {
        console.error("Error: ", error);
    }
}

ejecutaTodo();

//#region Funciones secundarias
function mergeJsonFinal() {
    const appPath = 'C:/Users/Usuario/Google Drive/Angular/plataforma-contratacion-estado/src/assets/data';
    const obsoletosPath = 'C:/Users/Usuario/Google Drive/OCM/Plataforma de contratacion del sector publico/Datos abiertos/Obsoletos';
    const intermediosPath = 'C:/Users/Usuario/Google Drive/OCM/Plataforma de contratacion del sector publico/Datos abiertos/Resultados contratos+licitaciones';

    const month = commonInstance.getOldMonth(responseMonth);

    const appPathFileData = path.join(appPath, `todo${month}2023NoRepeatOkCIFOK.json`);
    const obsoletosPathFileData = path.join(obsoletosPath, `todo${month}2023NoRepeatOkCIFOK.json`);

    const appPathFileAdjudicatarios = path.join(appPath, `todoAdjudicatarias${month}2023.json`);
    const obsoletosPathFileAdjudicatarios = path.join(obsoletosPath, `todoAdjudicatarias${month}2023.json`);

    let jsonMerge;
    fs.readFile(appPathFileData, function (err, data) {
        const json = JSON.parse(data);
        jsonFinalProcces.forEach((array) => {
            array.forEach((item) => json.push(item));
        })
        jsonMerge = json;
        // fs.writeFileSync(`${oldPath}/todo${responseMonth}2022NoRepeat.json`, JSON.stringify(json));
        const repeatJsonMerge = commonInstance.searchRepeat(jsonMerge);
        searchRepeatInstance.saveResultRepeat(jsonMerge.length, repeatJsonMerge.repeat, repeatJsonMerge.noRepeat, repeatJsonMerge.repeatMajor, responseMonth);
        cifrepeatInstance.question(repeatJsonMerge.noRepeat, responseMonth, appPath);
    })

    // Mover archivos a obsoletos
    // fs.renameSync(appPathFileAdjudicatarios, obsoletosPathFileAdjudicatarios);
    // fs.copyFileSync(appPathFileData, obsoletosPathFileData);
    // fs.renameSync(appPathFileData, obsoletosPathFileData);

}

function OLDmergeJsonFinal() {
    const oldPath = 'C:/Users/Usuario/Google Drive/Angular/plataforma-contratacion-estado/src/assets/data';
    const newPath = 'C:/Users/Usuario/Google Drive/OCM/Plataforma de contratacion del sector publico/Datos abiertos/Obsoletos';

    const month = commonInstance.getOldMonth(responseMonth);

    const oldOk = path.join(oldPath, `todo${month}2023NoRepeatOkCIFOK.json`);
    const newOk = path.join(newPath, `todo${month}2023NoRepeatOkCIFOK.json`);

    const oldAdjudicataria = path.join(oldPath, `todoAdjudicatarias${month}2023.json`);
    const newAdjudicataria = path.join(newPath, `todoAdjudicatarias${month}2023.json`);

    let jsonMerge;
    fs.readFile(oldOk, function (err, data) {
        const json = JSON.parse(data);
        jsonFinalProcces.forEach((array) => {
            array.forEach((item) => json.push(item));
        })
        jsonMerge = json;
        // fs.writeFileSync(`${oldPath}/todo${responseMonth}2022NoRepeat.json`, JSON.stringify(json));
        const repeatJsonMerge = commonInstance.searchRepeat(jsonMerge);
        searchRepeatInstance.saveResultRepeat(jsonMerge.length, repeatJsonMerge.repeat, repeatJsonMerge.noRepeat, repeatJsonMerge.repeatMajor, responseMonth);
        cifrepeatInstance.question(repeatJsonMerge.noRepeat, responseMonth, oldPath);
    })

    // Mover archivos a obsoletos
    // fs.renameSync(oldAdjudicataria, newAdjudicataria);
    // fs.copyFileSync(oldOk, newOk);
    // fs.renameSync(oldOk, newOk);

}

function saveFinalJson(arrayFinal) {
    fs.rmdirSync("./extracted", { recursive: true, force: true },
        (error) => {
            console.error("Error: ", error);
        });


    // pathResults se crea en mapJSON
    // pathResults = pathResultsParam.replace('FOLDER', process == 1 ? "licitaciones" : "contratos menores") + `/${responseMonth}`;
    if (!fs.existsSync(pathResults)) {
        fs.mkdirSync(pathResults);
    }

    // ¿Esta linea sirve para algo?
    jsonFinalProcces.push(arrayFinal);

    const result = searchRepeat(arrayFinal);
    createFile(`${pathResults}/final.json`, arrayFinal);

    const totalRepeticiones = arrayFinal.length;
    const noRepetidos = result.listNoRepeat;
    const repetidos = result.listRepeat;
    const mayores = result.listRepeatMajor;
    const processDescription = process === 1 ? 'licitaciones' : 'contratos menores';
    const ao = process === 1 ? 'a' : 'o';

    console.log("************** TERMINADO ********************");
    console.log(`Tiempo para ejecutar extractZip()    = ${this.timeExtractZip} minutos`);
    console.log(`Tiempo para ejecutar parseXML2JSON() = ${this.timeParseXML2JSON} minutos`);
    console.log(`Tiempo para ejecutar mapJSON()       = ${this.timeMapJSON} minutos`);
    console.log(`Total lineas XML analizadas          = ${new Intl.NumberFormat('es-Es').format(this.totalLines)}`);
    console.log(`Total ${processDescription} encontrad${ao}s:      = ${totalRepeticiones}`);
    console.log(`Total ${processDescription} sin repeticiones: = ${noRepetidos}`);
    console.log(`Total ${processDescription} con repeticiones: = ${repetidos}`);
    console.log(`Total ${processDescription} repetid${ao}s más recientes:  = ${mayores}`);

    logFinal(totalRepeticiones, noRepetidos, repetidos, mayores);
}

function searchRepeat(arrayFinal) {
    const objectRepeat = commonInstance.searchRepeat(arrayFinal);

    commonInstance.createFile(`${pathResults}/repeat.json`, objectRepeat.repeat);
    commonInstance.createFile(`${pathResults}/repeatMajor.json`, objectRepeat.repeatMajor);
    commonInstance.createFile(`${pathResults}/finalNoRepeat.json`, objectRepeat.noRepeat);

    return { listRepeat: objectRepeat.repeat.length, listRepeatMajor: objectRepeat.repeatMajor.length, listNoRepeat: objectRepeat.noRepeat.length };
}

function logFinal(totalLicitaciones, sinRepeticion, repetidos, mayores) {
    const processDescription = process === 1 ? 'licitaciones' : 'contratos menores';
    const ao = process === 1 ? 'a' : 'o';

    const logFinal = {
        "Tiempo para ejecutar extractZip()": `${this.timeExtractZip} minutes`,
        "Tiempo para ejecutar parseXML2JSON()": `${this.timeParseXML2JSON} minutes`,
        "Tiempo para ejecutar mapJSON()": `${this.timeMapJSON} minutes`,
        "Total lineas XML analizadas": `${new Intl.NumberFormat('es-Es').format(this.totalLines)}`,
        [`Total ${processDescription} encontrad${ao}s:`]: totalLicitaciones,
        [`Total ${processDescription} sin repeticiones`]: sinRepeticion,
        [`Total ${processDescription} con repeticiones`]: repetidos,
        [`Total ${processDescription} repetid${ao}s más recientes`]: mayores,

    }

    createFile(`${pathResults}/logFinal.json`, logFinal);
}

async function readLines(name) {
    const pathAtom = __dirname + '/extracted/atom/' + name;
    return new Promise((resolve, reject) => {
        const readInterface = readLineFile.createInterface({
            input: fs.createReadStream(pathAtom),
            // Cuando lo paso a TS tengo que cambiar ouput a output
            // si lo cambio aqui comienza a volcar por consola.
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

function readFiles(pathSearch) {
    return fs.readdirSync(pathSearch);
}

function createFile(path, data) {
    fs.writeFileSync(
        path,
        JSON.stringify(data),
        function (err) {
            if (err) throw err;
        }
    );
}

//#endregion