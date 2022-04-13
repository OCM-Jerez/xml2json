const fs = require('fs');
const readline = require('readline-sync');

const dataInitial = require("./todo032022NoRepeatOk.json");

const listPartyIdentification = [];
const listAdjudicatarios = [];

question();

function question() {
    dataInitial.forEach(item => {
        if (item.arrayTenderResult && item.arrayTenderResult.length > 0) {
            item.arrayTenderResult.forEach(tender => {
                const findParty = listPartyIdentification.find(item => tender.PartyIdentification === item);
                if (!findParty) {
                    const dataRepeat = searchRepeatTender(tender.PartyIdentification, tender.PartyName);
                    if (dataRepeat.length > 1) {
                        listPartyIdentification.push(tender.PartyIdentification);
                        console.log('CIF: ', tender.PartyIdentification);
                        let question = 'Seleccionar una opción\n';
                        dataRepeat.forEach((repeatItem, index) => {
                            question = question + index + ': ' + repeatItem.PartyName + '\n';
                        })
                        const option = readline.question(question);
                        const name = dataRepeat[option].PartyName;
                        replacePartyName(tender.PartyIdentification, name)
                    }
                }
            })
        }
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

    createFile("./resultados/todoAdjudicatarias032022.json", adjudicatarias);
    createFile("./resultados/todo032022NoRepeatOkCIFOK.json", dataInitial);
}

function replacePartyName(partyIdentification, partyName) {
    dataInitial.filter(filter => filter.arrayTenderResult && filter.arrayTenderResult.length > 0).forEach(item => {
        item.arrayTenderResult.filter(tenderFilter => tenderFilter.PartyIdentification === partyIdentification)
            .forEach(tender => {
                tender.PartyName = partyName;
            });
    })
}

function searchRepeatTender(partyIdentification, partyName) {
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
    return uniqueTender;
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

function logFinal(listRepeat, listRepeatMajor, listNoRepeat) {
    const logFinal = {
        "Total resultados iniciales:": dataInitial.length,
        "Total resultados con repeticiones": listRepeat,
        "Total resultados repetidos más recientes": listRepeatMajor,
        "Total resultados sin repeticiones": listNoRepeat,
    }
    createFile("./resultados/logFinal032022.json", logFinal);
}
