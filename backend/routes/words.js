const express = require('express');
const { words } = require('../utils/loadcsv.js');

const router = express.Router();

function scrambleWord(word) {
    let chars = word.slice(0, -1).split('');

    for (let i = chars.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1))
        const temp = chars[i];
        chars[i] = chars[j];
        chars[j] = temp;
    }
    chars.push(' ');

    return chars.join('');
}



router.get('/visible', (req, res) => {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    const scrambledWord =  scrambleWord(randomWord);
    res.json({ randomWord, scrambledWord });
});


module.exports = router;


// current implementation is already hard but this sucks even more
// let chars = word.split('');
// let numRemove = 1;
// a bit TOO hard
// if (word.length <= 4){
//     numRemove = 1;
// } else if (word.length <= 7){
//     numRemove = 2;
// } else {
//     numRemove = 3;
// }

// for (let i = 0; i < numRemove; ++i){
//     const randomIdx = Math.floor(Math.random() * chars.length);
//     chars.splice(randomIdx, 1, '_');
// }

// for (let i = chars.length - 1; i > 0; i--){
//     const j = Math.floor(Math.random() * (i + 1))
//     const temp = chars[i];
//     chars[i] = chars[j];
//     chars[j] = temp;
// }

// return chars.join('');