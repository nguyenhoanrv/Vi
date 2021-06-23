const testFolder = './../';
const fs = require('fs');

module.exports =
    fs.readdir(testFolder, (err, files) => {
        var random = Math.floor(Math.random() * files.length);
        console.log(files[random]);
    });