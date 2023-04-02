/* eslint-disable comma-dangle */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable eol-last */
/* eslint-disable space-before-function-paren */
/* eslint-disable n/no-path-concat */
/* eslint-disable n/handle-callback-err */
/* eslint-disable no-unused-vars */
/* eslint-disable spaced-comment */
/* eslint-disable padded-blocks */
/* eslint-disable new-cap */
/* eslint-disable eqeqeq */
/* eslint-disable prefer-const */
/* eslint-disable indent */
/* eslint-disable quotes */
/* eslint-disable no-undef */
/* eslint-disable semi */
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

    getOldMonth(monthCurrent) {
        let month = Number(monthCurrent);

        month = month - 1;
        if (month < 0) {
            month = 12;
        }

        if (month < 10) {
            return `0${month}`
        }

        return month;
    }

}

module.exports = Common;