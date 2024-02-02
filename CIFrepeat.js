const fs = require('fs');
const Common = require('./common');
const commonInstance = new Common();

const readline = require('readline-sync');
const { log } = require('console');

const listPartyIdentification = [];
const listAdjudicatarios = [];

class CifRepeat {
	question(dataInitial, monthSelected, pathApp) {
		// dataInitial.filter(item => item.arrayTenderResult && item.arrayTenderResult.length > 0).forEach(item => {
		//     item.arrayTenderResult.forEach(tender => {

		//         const findParty = listPartyIdentification.find(item => tender.PartyIdentification === item);
		//         if (!findParty) {
		//             //const dataRepeat = searchRepeatTender(dataInitial, tender.PartyIdentification, tender.PartyName);

		//             const dataRepeat = this.searchRepeatTender(dataInitial, tender.PartyIdentification);

		//             // if (tender.PartyIdentification === 'B11604972' && dataRepeat.length > 1) {
		//             //     debugger
		//             // }
		//             if (dataRepeat.length > 1) {
		//                 listPartyIdentification.push(tender.PartyIdentification);
		//                 console.log('CIF: ', tender.PartyIdentification);
		//                 let question = 'Seleccionar una opción\n';
		//                 dataRepeat.forEach((repeatItem, index) => {
		//                     question = question + index + ': ' + repeatItem.PartyName + '\n';
		//                 })
		//                 const option = readline.question(question);
		//                 const name = dataRepeat[option].PartyName;
		//                 this.replacePartyName(dataInitial, tender.PartyIdentification, name)
		//             }
		//         }
		//     })
		// })

		const month = commonInstance.getOldMonth(monthSelected);
		log('month', month);
		const oldData = fs.readFileSync(`${pathApp}/todoAdjudicatarias${month}2023.json`);
		const oldDataJson = JSON.parse(oldData);
		const newAdjudicatarias = [];

		dataInitial
			.filter((item) => item.arrayTenderResult && item.arrayTenderResult.length > 0)
			.forEach((item) => {
				item.arrayTenderResult.forEach((tender) => {
					const resultOld = oldDataJson.find((oldItem) => oldItem.PartyIdentification === tender.PartyIdentification);
					if (resultOld) {
						this.replacePartyName(dataInitial, tender.PartyIdentification, resultOld.PartyName);
					} else {
						const findParty = listPartyIdentification.find((item) => tender.PartyIdentification === item);
						if (!findParty) {
							const dataRepeat = this.searchRepeatTender(dataInitial, tender.PartyIdentification);

							if (dataRepeat.length > 1) {
								listPartyIdentification.push(tender.PartyIdentification);
								console.log('CIF: ', tender.PartyIdentification);
								let question = 'Seleccionar una opción\n';
								dataRepeat.forEach((repeatItem, index) => {
									question = question + index + ': ' + repeatItem.PartyName + '\n';
								});
								const option = readline.question(question);
								const name = dataRepeat[option].PartyName;
								this.replacePartyName(dataInitial, tender.PartyIdentification, name);
							}

							newAdjudicatarias.push({ PartyName: tender.PartyName, PartyIdentification: tender.PartyIdentification });
						}
					}
				});
			});

		dataInitial
			.filter((filter) => filter.arrayTenderResult && filter.arrayTenderResult.length > 0)
			.forEach((item) => {
				item.arrayTenderResult.forEach((tender) => {
					const isDuplicate = listAdjudicatarios.filter(
						(item) => item.PartyIdentification === tender.PartyIdentification
					);
					if (isDuplicate.length === 0) {
						listAdjudicatarios.push({ PartyName: tender.PartyName, PartyIdentification: tender.PartyIdentification });
					}
				});
			});

		// let adjudicatarias = Array.from(new Set(listAdjudicatarios.map(a => a.PartyName.trim())))
		//     .map(PartyName => {
		//         return listAdjudicatarios.find(a => a.PartyName.trim() === PartyName.trim())
		//     })

		const adjudicatarias = listAdjudicatarios.sort(function (a, b) {
			if (a.PartyName.trim() < b.PartyName.trim()) {
				return -1;
			}
			if (a.PartyName.trim() > b.PartyName.trim()) {
				return 1;
			}
			return 0;
		});

		commonInstance.createFile(`${pathApp}/todoAdjudicatarias${monthSelected}2024.json`, adjudicatarias);
		commonInstance.createFile(`${pathApp}/todo${monthSelected}2024NoRepeatOkCIFOK.json`, dataInitial);
		commonInstance.createFile(`${pathApp}/nuevasAdjudicatarias${monthSelected}2024.json`, newAdjudicatarias);
		// this.logFinal()
	}

	replacePartyName(dataInitial, partyIdentification, partyName) {
		dataInitial
			.filter((filter) => filter.arrayTenderResult && filter.arrayTenderResult.length > 0)
			.forEach((item) => {
				item.arrayTenderResult
					.filter((tenderFilter) => tenderFilter.PartyIdentification === partyIdentification)
					.forEach((tender) => {
						tender.PartyName = partyName.trim();
					});
			});
	}

	searchRepeatTender(dataInitial, partyIdentification) {
		let arrayTenderFilter = [];
		dataInitial
			.filter((filter) => filter.arrayTenderResult && filter.arrayTenderResult.length > 0)
			.forEach((item) => {
				item.arrayTenderResult
					.filter((tenderFilter) => tenderFilter.PartyIdentification === partyIdentification)
					.forEach((tender) => {
						arrayTenderFilter.push(tender);
					});
			});

		const uniqueTender = Array.from(new Set(arrayTenderFilter.map((a) => a.PartyName.trim()))).map((PartyName) => {
			return arrayTenderFilter.find((a) => a.PartyName.trim() === PartyName.trim());
		});
		return uniqueTender; //
	}

	logFinal(dataInitial, listRepeat, listRepeatMajor, listNoRepeat, monthSelected) {
		const path = `C:/Users/Usuario/OneDrive/OCM/Plataforma de contratacion del sector publico/Datos abiertos/Tratados con CIFrepeat.js/2024/${monthSelected}`;

		const logFinal = {
			'Total resultados iniciales:': dataInitial.length,
			'Total resultados con repeticiones': listRepeat,
			'Total resultados repetidos más recientes': listRepeatMajor,
			'Total resultados sin repeticiones': listNoRepeat
		};
		commonInstance.createFile(`${path}/logFinal${monthSelected}2024.json`, logFinal);
	}
}

module.exports = CifRepeat;
