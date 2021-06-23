const testFolder = './';
const fs = require('fs');

module.exports =
    fs.readdir(testFolder, (err, files) => {
        files.forEach(file => {
            console.log(file);
        });
    });