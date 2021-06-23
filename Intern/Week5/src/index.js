// import thư viện express
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const app = express();
const route = require('./routes')
var PORT = process.env.PORT || 4000;
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'somesecret',
    cookie: { maxAge: 60000 }
}));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.static('public'))

route(app)


app.listen(PORT, function() {
    console.log('Express listening on port' + PORT + ' !');
});


function htmlEntities(str) {
    return String(str).replace(/&amp;amp;/g, '&amp;amp;amp;').replace(/&amp;lt;/g, '&amp;amp;lt;').replace(/&amp;gt;/g, '&amp;amp;gt;').replace(/"/g, '&amp;amp;quot;');
}