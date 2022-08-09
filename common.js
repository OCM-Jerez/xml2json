const fs = require("fs");

class Common {
    searchRepeat(arrayData) {
        const listRepeat = [];
        const listNoRepeat = [];
        const listRepeatMajor = [];

        console.log("Resultados iniciales", arrayData.length);
        arrayData.forEach(item => {

            const data = arrayData.filter(filterItem => filterItem.ContractFolderID === item.ContractFolderID);

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

        return { repeat: listRepeat, repeatMajor: listRepeatMajor, noRepeat: listNoRepeat }
    }

    createFile(path, data) {
        fs.writeFileSync(
            path,
            JSON.stringify(data),
            function (err) {
                if (err) throw err;
            }
        );
    }

}

module.exports = Common;