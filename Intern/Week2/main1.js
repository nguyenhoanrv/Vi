var https = require('https');
const {
    resolve
} = require('path');
var url = new Array(
    "https://www.google.com/",
    "https://www.youtube.com/",
    "https://github.com/",
    "https://baomoi.com/",
    "https://tuoitre.vn/",
);

function getTitle(url, arr) {
    https.get(url, function(res) {
        res.setEncoding('utf8');
        var content = "";
        res.on('data', function(chunk) {
            content += chunk;
        });
        res.on('error', function(err) {
            console.log('RESPONSE ERROR: ' + err);
        });
        res.on('data', function(data) {
            var index1 = data.search("<title>");
            var index2 = data.search("</title>")
            var title = data.slice(index1 + 7, index2).trim();
            arr.push(title);
        });
    });
}
var arr = [];


function getArr(url, arr) {
    return new Promise((resolve, reject) => {
        url.forEach(element => {
            getTitle(element, arr);
        });
        resolve(arr);
    });
}
getArr(url, arr).then(
        arr.forEach(element => {
            console.log(element);
        })
    )
    .catch(error => {
        console.log(error);
    });