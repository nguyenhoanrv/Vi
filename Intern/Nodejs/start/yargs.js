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
console.log("Enter n: ")
var number = yargs.argv.n;
if (typeof number == 'undefined') {
    console.log("You did not enter N!");
} else {
    if (checkPrimeNumber(number) == false)
        console.log("N is not prime number");
    else
        console.log("N is prime number");
}