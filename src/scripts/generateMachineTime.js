const moment = require("moment");
const fs = require("fs");

const data = []

const start = moment("01.01.2019", "DD.MM.YYYY");
const end = moment("31.12.2020", "DD.MM.YYYY");

// loop through all days
for (var m = moment(start); m.diff(end, 'days') <= 0; m.add(1, 'days')) {
    const seconds = 86400; // seconds in a day
    let categories = [0,0,0]; // initialize time categories

    // randomly allocate time to categories
    for(let i=0; i < seconds; i+=1600) {
        categories[Math.floor(Math.random() * 3)] += 1600;
    }

    // move data around to ease amount of failures and idle
    categories[2] += 0.7 * categories[0] + 0.5 * categories[1];
    categories[0] *= 0.3;
    categories[1] *= 0.5;

    // create formated string from seconds
    const timeString = time => {
        let seconds = time % 60;
        let minutes = Math.floor(time / 60);
        const hours = Math.floor(minutes / 60);
        minutes = minutes % 60;
        if(seconds < 10) seconds = "0" + seconds;
        if(minutes < 10) minutes = "0" + minutes;

        return hours + ":" + minutes + ":" + seconds;
    };
    // create day object containing the information
    const dayObj = {
        "Date": m.format('DD.MM.YYYY'),
        "Failure": timeString(categories[0]),
        "Idle": timeString(categories[1]),
        "Running": timeString(categories[2])
    };
    // push day object to array of data
    data.push(dayObj);
}

let dataString = JSON.stringify(data, null, 2);

// write outputData to new json file
fs.writeFile("./public/data/machinetime.json", dataString, err => {
    if (err) throw err;
    console.log("Data written to geoJSON file");
});