const fs = require('fs');
const dataInitial = require("./todasLicitacionesHasta082021.json");
searchRepeat(dataInitial);

function searchRepeat(dataInitial) {
    const listRepeat = [];
    const listNoRepeat = [];
    const listRepeatMajor = [];

    console.log("Resultados iniciales", dataInitial.length);
    dataInitial.forEach(item => {

        const data = dataInitial.filter(filterItem => filterItem.ContractFolderID === item.ContractFolderID);

        if (data.length > 1) {
            listRepeat.push(item);
        } else {
            listNoRepeat.push(item);
        }

    });

    listRepeat.forEach(item => {
        const itemMajor = listRepeatMajor.find(findItem => findItem.ContractFolderID === item.ContractFolderID);

        if (itemMajor === undefined) {
            const data = listRepeat.filter(filterItem => filterItem.ContractFolderID === item.ContractFolderID);
            const major = data.reduce((prev, current) => {
                const dateItemPrev = new Date(prev.updated);
                const dateItemCurrent = new Date(current.updated);
                return dateItemPrev > dateItemCurrent ? prev : current
            });

            listRepeatMajor.push(major);
            listNoRepeat.push(major);
        }
    });

    if (!fs.existsSync("./resultados")) {
        fs.mkdirSync("resultados");
    }

    createFile("./resultados/repeat.json", listRepeat);
    createFile("./resultados/repeatMajor.json", listRepeatMajor);
    createFile("./resultados/finalNoRepeat.json", listNoRepeat);

    console.log("Resultados repetidos", listRepeat.length);
    console.log("Resultados con fecha mayor", listRepeatMajor.length);
    console.log("Resultados sin repeticiones", listNoRepeat.length);

    logFinal(listRepeat.length, listRepeatMajor.length, listNoRepeat.length)

    return { listRepeat: listRepeat.length, listRepeatMajor: listRepeatMajor.length, listNoRepeat: listNoRepeat.length };
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

    createFile("./resultados/logFinal.json", logFinal);
}
