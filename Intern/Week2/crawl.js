const getTitlePromise = require('./getTitle');
// var url1 = "https://www.google.com/";
// var url2 = "https://www.youtube.com/";
// var url3 = "https://github.com/";
// var url4 = "https://baomoi.com/";
// var url5 = "https://tuoitre.vn/";
// var urlArr = [url1, url2, url3, url4, url5];
var url = new Array(
    "https://www.google.com/",
    "https://www.youtube.com/",
    "https://freetuts.net/",
    "https://baomoi.com/",
    "https://tuoitre.vn/",
);

async function run(url, arr) {
    for (let i = 0; i < url.length; i++) {
        arr[i] = getTitlePromise(url[i]);
    }
    // var string1 = getTitlePromise(url1);
    // var string2 = getTitlePromise(url2);
    // var string3 = getTitlePromise(url3);
    // var string4 = await getTitlePromise(url4);
    // var string5 = await getTitlePromise(url5);
    // return ([arr[0], arr[1], arr[2], arr[3], arr[4]])
    return arr;
}
var arr = [];
run(url, arr).then(function(values) {
    values.forEach(element => {
        console.log(element);
    });
});