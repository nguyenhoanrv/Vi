var https = require('https');
const { resolve } = require('path');
var url = new Array(
    "https://www.google.com/",
    "https://www.youtube.com/",
    "https://freetuts.net/",
    "https://baomoi.com/",
    "https://tuoitre.vn/",
);

function getTitle(url, i, arr) {
    https.get(url, function(res) {
        res.setEncoding('utf8');
        let content = "";
        res.on('data', function(chunk) {
            content += chunk;
        });
        res.on('error', function(err) {
            console.log('RESPONSE ERROR: ' + err);
        });
        res.on('end', function() {
            var index1 = content.search("<title>");
            var index2 = content.search("</title>")
            var title = content.slice(index1 + 7, index2).trim();
            arr[i] = title;
            if (arr[0] && arr[1] && arr[2] && arr[3] && arr[4]) {
                // arr.forEach(element => {
                //     console.log(element);
                // });
                return arr;
            }
            return arr;
        })
    }).end;
}

function getArr(url, arr) {
    return new Promise((resolve, reject) => {
        for (let i = 0; i < url.length; i++) {
            arr = getTitle(url[i], i, arr);
        }
        resolve(arr);
    });
}
var arr = [];

function run(url, arr) {
    getArr(url, arr).then(function(value) {
        console.log(value);
    })
}
run(url, arr);