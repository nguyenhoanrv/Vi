var https = require('https');

function getTitlePromise(url) {
    return new Promise(function(resolve, reject) {
        {
            https.get(url, function(res) {
                var content = '';
                res.on('data', function(chunk) {
                    content += chunk;
                });
                res.on('end', function() {
                    var start = content.search("<title>");
                    var end = content.search("</title>");
                    var string = content.slice(start + 7, end);
                    resolve(string);
                });
            }).on('error', function(e) {
                console.log("Got error: " + e.message);
                reject(e);
            })
        }
    })
}

module.exports = getTitlePromise;