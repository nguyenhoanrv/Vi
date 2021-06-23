const express = require('express');
var path = require('path');
const hbs = require('express-handlebars');
const route = require('./routes/');
const app = express();
const db = require('./config/db');
const PORT = 3000;

//test cache
// connect db
db.connect();

// xet duong day static public
app.use(express.static(path.join(__dirname, 'public')));
// xet nhan du lieu toi server 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine(
    'hbs',
    hbs({
        extname: '.hbs',
    }),
);
app.set('views', path.join(__dirname, 'resource','views'));
app.set('view engine', 'hbs');

// Route
route(app);

app.listen(PORT);
