var yargs = require('yargs');
var info = yargs.command('getInfo', 'Get information of user', function(yargs) {
    return yargs.options({
        username: {
            demand: true,
            alias: 'u',
            default: 'user'
        },
        email: {
            demand: true,
            type: 'string'
        }
    });
}).help().argv;
console.log(info);
console.log(__dirname);
console.log(__filename);