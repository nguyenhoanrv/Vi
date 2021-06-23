var https = require('https');
const { resolve } = require('path');
var url = new Array(
    "https://www.google.com/",
    "https://www.youtube.com/",
    "https://freetuts.net/",
    "https://baomoi.com/",
    "https://tuoitre.vn/",
);
var objs = [];
for (let i = 0; i < url.length; i++) {
    objs[i] = {
        key: i,
        url: url[i],
        title: "",
        setTitle: function() {
            this.title = getTitle(this.url);
        }
    }
}

function getTitle(url) {
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
            return title;
        })
    }).end;
}

// function getArr(url, arr) {
//     return new Promise((resolve, reject) => {
//         for (let i = 0; i < url.length; i++) {
//             getTitle(url[i], i, arr);
//         }
//         resolve(arr);
//     });
// }
// var arr = [];
// async function run(url, arr) {
//     getArr(url, arr).then(function(value) {
//         return value;
//     })
// }
// run(url, arr).then(function(value) {
//     console.log(value);
// })