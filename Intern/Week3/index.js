var express = require('express');
var app = express();
app.set('views', './views');
app.set('view engine', 'ejs');
app.get('/', function(req, res) {
    res.render('index');
});
app.get('/time', function(req, res) {
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;
    res.render('time', {
        dateTime: dateTime
    });
});
app.get('/time/day', function(req, res) {
    var today = new Date();
    var day = today.getDay();
    if (day == 0)
        day = 'Sunday';
    else if (day == 1)
        day = 'Monday';
    else if (day == 2)
        day = 'Tuesday';
    else if (day == 3)
        day = 'Wednesday';
    else if (day == 4)
        day = 'Thursday';
    else if (day == 5)
        day = 'Friday';
    else
        day = 'Saturday';
    res.render('timeDay', {
        day: day
    });
});
app.listen(8080);