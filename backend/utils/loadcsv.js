const fs = require('fs');
const csvParser = require('csv-parser');

let words = []

function loadFromCSV(){
    fs.createReadStream('./english-words.csv')
        .pipe(csvParser())
        .on('data', (row) => {
            words.push(row.Word);
        })
        .on('end', () => [
            console.log('First few words:', words.slice(0, 10)),
            console.log('Done loading from CSV')
        ]);
}

module.exports = {
    words,
    loadFromCSV
}