const yargs = require("yargs");

function checkPrimeNumber(number) {
    if (number < 2)
        return false;
    else if (number == 2)
        return true;
    else if (number % 2 == 0)
        return false;
    else {
        for (var i = 3; i < number - 1; i += 2) {
            if (number % i == 0)
                return false;
        }
    }
    return true;
}
var number = yargs.argv.n;
if (typeof number == 'undefined') {
    console.log("Require N!");
} else {
    if (checkPrimeNumber(number) == false)
        require('./showFile.js')
    else
        require('./showListFile.js')
}