const fs = require("fs");
import { createRequire } from 'module';
const requireMam = createRequire(import.meta.url);
const serviceAccount = requireMam('./todos.json');

function searchRepeat(arrayFinal) {
    const listRepeat = [];
    const listNoRepeat = [];
    const listRepeatMajor = [];

    arrayFinal.forEach(item => {
        const data = arrayFinal.filter(filterItem => filterItem.ContractFolderID === item.ContractFolderID);

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

    createFile("repeat.json", listRepeat);
    createFile("repeatMajor.json", listRepeatMajor);
    createFile("finalNoRepeat.json", listNoRepeat);

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


searchRepeat(serviceAccount);