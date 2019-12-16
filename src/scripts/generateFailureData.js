const moment = require("moment");
const fs = require("fs");

const data = []

const start = moment("01.01.2019", "DD.MM.YYYY");
const end = moment("31.12.2020", "DD.MM.YYYY");

// loop through all days
for (var m = moment(start); m.diff(end, 'days') <= 0; m.add(1, 'days')) {
    // create day object containing the information
    const dayObj = {
        Date: m.format('DD.MM.YYYY'),
        Amount: Math.floor(Math.random() * 200) + 1
    };
    // push day object to array of data
    data.push(dayObj);
}

let dataString = JSON.stringify(data, null, 2);

// write outputData to new json file
fs.writeFile("./public/data/FailureData.json", dataString, err => {
    if (err) throw err;
    console.log("Data written to geoJSON file");
});