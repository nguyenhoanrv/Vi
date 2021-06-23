const express = require('express');
const path = require('path')
const pug = require('pug');
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
const app = express();
const route = require('./routes');
const port = 3001;
var cors = require('cors')


app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded());
app.set('views', './src/views');
app.set('view engine', 'pug');
app.set("views", path.join(__dirname, 'src/views'));
app.use(express.urlencoded({ extended: true }))
route(app);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}/login`)
})