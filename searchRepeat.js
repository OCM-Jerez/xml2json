const fs = require('fs');
const Common = require('./common');
const commonInstance = new Common();

class SearchRepeat {
	saveResultRepeat(dataInitial, listRepeat, listNoRepeat, listRepeatMajor, monthSelected) {
		// const pathRepeat = "C:/Users/Usuario/Google Drive/OCM/Plataforma de contratacion del sector publico/Datos abiertos/Tratados con searchRepeat.js/2022/" + monthSelected;
		// const pathRepeat = "C:/Users/Usuario/Mi unidad/OCM/Plataforma de contratacion del sector publico/Datos abiertos/Tratados con searchRepeat.js/2025/" + monthSelected;
		const pathRepeat =
			'C:/Users/Usuario/OneDrive/OCM/Plataforma de contratacion del sector publico/Datos abiertos/Tratados con searchRepeat.js/2025/' +
			monthSelected;

		if (!fs.existsSync(pathRepeat)) {
			fs.mkdirSync(pathRepeat);
		}

		commonInstance.createFile(`${pathRepeat}/repeat${monthSelected}2025.json`, listRepeat);
		commonInstance.createFile(`${pathRepeat}/repeatMajor${monthSelected}2025.json`, listRepeatMajor);
		commonInstance.createFile(`${pathRepeat}/todo${monthSelected}2025NoRepeatOK.json`, listNoRepeat);
		console.log('Resultados repetidos', listRepeat.length);
		console.log('Resultados con fecha mayor', listRepeatMajor.length);
		console.log('Resultados sin repeticiones', listNoRepeat.length);

		this.logFinal(
			pathRepeat,
			monthSelected,
			dataInitial,
			listRepeat.length,
			listRepeatMajor.length,
			listNoRepeat.length
		);

		return {
			listRepeat: listRepeat.length,
			listRepeatMajor: listRepeatMajor.length,
			listNoRepeat: listNoRepeat.length
		};
	}

	logFinal(pathRepeat, monthSelected, dataInitial, listRepeat, listRepeatMajor, listNoRepeat) {
		const logFinal = {
			'Total resultados iniciales:': dataInitial,
			'Total resultados con repeticiones': listRepeat,
			'Total resultados repetidos más recientes': listRepeatMajor,
			'Total resultados sin repeticiones': listNoRepeat
		};

		commonInstance.createFile(`${pathRepeat}/logFinal${monthSelected}2025.json`, logFinal);
	}
}
module.exports = SearchRepeat;
