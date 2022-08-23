const fs = require('fs');
const Common = require('./common');
const commonInstance = new Common();

const readline = require('readline-sync');

//const dataInitial = require("./todo062022NoRepeatOk.json");

const listPartyIdentification = [];
const listAdjudicatarios = [];

class CifRepeat {
    // question();

    question(dataInitial, monthSelected, pathApp) {
        dataInitial.forEach(item => {
            if (item.arrayTenderResult && item.arrayTenderResult.length > 0) {
                item.arrayTenderResult.forEach(tender => {
                    const findParty = listPartyIdentification.find(item => tender.PartyIdentification === item);
                    if (!findParty) {
                        //const dataRepeat = searchRepeatTender(dataInitial, tender.PartyIdentification, tender.PartyName);

                        const dataRepeat = this.searchRepeatTender(dataInitial, tender.PartyIdentification);

                        if (dataRepeat.length > 1) {
                            listPartyIdentification.push(tender.PartyIdentification);
                            console.log('CIF: ', tender.PartyIdentification);
                            let question = 'Seleccionar una opción\n';
                            dataRepeat.forEach((repeatItem, index) => {
                                question = question + index + ': ' + repeatItem.PartyName + '\n';
                            })
                            const option = readline.question(question);
                            const name = dataRepeat[option].PartyName;
                            this.replacePartyName(dataInitial, tender.PartyIdentification, name)
                        }
                    }
                })
            }
        })

        const month = commonInstance.getOldMonth(monthSelected);


        const oldData = fs.readFileSync(`${pathApp}/todoAdjudicatarias${month}2022.json`);
        const oldDataJson = JSON.parse(oldData);


        dataInitial.filter(item => item.arrayTenderResult && item.arrayTenderResult.length > 0).forEach(item => {
            item.arrayTenderResult.forEach(tender => {
                const resultOld = oldDataJson.find(oldItem => oldItem.PartyIdentification === tender.PartyIdentification);
                if (resultOld) {
                    this.replacePartyName(dataInitial, tender.PartyIdentification, resultOld.PartyName);
                } else {
                    const findParty = listPartyIdentification.find(item => tender.PartyIdentification === item);
                    if (!findParty) {

                        const dataRepeat = this.searchRepeatTender(dataInitial, tender.PartyIdentification);

                        if (dataRepeat.length > 1) {
                            listPartyIdentification.push(tender.PartyIdentification);
                            console.log('CIF: ', tender.PartyIdentification);
                            let question = 'Seleccionar una opción\n';
                            dataRepeat.forEach((repeatItem, index) => {
                                question = question + index + ': ' + repeatItem.PartyName + '\n';
                            })
                            const option = readline.question(question);
                            const name = dataRepeat[option].PartyName;
                            this.replacePartyName(dataInitial, tender.PartyIdentification, name)
                        }
                    }
                }

            })
        })

        dataInitial.filter(filter => filter.arrayTenderResult && filter.arrayTenderResult.length > 0).forEach(item => {
            item.arrayTenderResult.forEach(tender => {
                listAdjudicatarios.push({ PartyName: tender.PartyName, PartyIdentification: tender.PartyIdentification })
            })
        })

        let adjudicatarias = Array.from(new Set(listAdjudicatarios.map(a => a.PartyName.trim())))
            .map(PartyName => {
                return listAdjudicatarios.find(a => a.PartyName.trim() === PartyName.trim())
            })

        adjudicatarias = adjudicatarias.sort(function (a, b) {
            if (a.PartyName.trim() < b.PartyName.trim()) { return -1 }
            if (a.PartyName.trim() > b.PartyName.trim()) { return 1 }
            return 0;
        });

        // C:/Users/Usuario/Google Drive/Angular/plataforma-contratacion-estado/src/assets/data
        commonInstance.createFile(`${pathApp}/todoAdjudicatarias${monthSelected}2022.json`, adjudicatarias);
        commonInstance.createFile(`${pathApp}/todo${monthSelected}2022NoRepeatOkCIFOK.json`, dataInitial);
        // this.logFinal()
    }



    replacePartyName(dataInitial, partyIdentification, partyName) {
        dataInitial.filter(filter => filter.arrayTenderResult && filter.arrayTenderResult.length > 0).forEach(item => {
            item.arrayTenderResult.filter(tenderFilter => tenderFilter.PartyIdentification === partyIdentification)
                .forEach(tender => {
                    tender.PartyName = partyName;
                });
        })
    }

    // searchRepeatTender(partyIdentification, partyName) {
    searchRepeatTender(dataInitial, partyIdentification) {
        let arrayTenderFilter = [];
        dataInitial.filter(filter => filter.arrayTenderResult && filter.arrayTenderResult.length > 0).forEach(item => {
            item.arrayTenderResult.filter(tenderFilter => tenderFilter.PartyIdentification === partyIdentification)
                .forEach(tender => {
                    arrayTenderFilter.push(tender);
                })
        })
        const uniqueTender = Array.from(new Set(arrayTenderFilter.map(a => a.PartyName.trim())))
            .map(PartyName => {
                return arrayTenderFilter.find(a => a.PartyName.trim() === PartyName.trim())
            })
        return uniqueTender;//
    }


    // C:/Users/Usuario/Google Drive/OCM/Plataforma de contratacion del sector publico/Datos abiertos/Tratados con CIFrepeat.js/2022/06
    logFinal(dataInitial, listRepeat, listRepeatMajor, listNoRepeat, monthSelected) {
        const path = `C:/Users/Usuario/Google Drive/OCM/Plataforma de contratacion del sector publico/Datos abiertos/Tratados con CIFrepeat.js/2022/${monthSelected}`;
        const logFinal = {
            "Total resultados iniciales:": dataInitial.length,
            "Total resultados con repeticiones": listRepeat,
            "Total resultados repetidos más recientes": listRepeatMajor,
            "Total resultados sin repeticiones": listNoRepeat,
        }
        commonInstance.createFile(`${path}/logFinal${monthSelected}2022.json`, logFinal);
    }
}

module.exports = CifRepeat;
