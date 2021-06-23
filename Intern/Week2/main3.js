var https = require('https');
const { resolve } = require('path');
var url = [
    "https://www.google.com/",
    "https://www.youtube.com/",
    "https://freetuts.net/",
    "https://baomoi.com/",
    "https://tuoitre.vn/",
];

function getTitle(url, i, arr, length) {
    https.get(url, function(res) {
        res.setEncoding('utf8');
        var content = "";
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
            let flag = 0;
            for (let i = 0; i < length; i++) {
                if (arr[i]) flag++;
                else
                    break;
            }
            if (flag == length) {
                arr.forEach(element => {
                    console.log(element);
                });
            }
        })
    }).end;
}

var arr = [];
for (let i = 0; i < url.length; i++) {
    getTitle(url[i], i, arr, url.length);
}