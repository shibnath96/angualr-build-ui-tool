const express = require('express');
const app = express();
const bodyParser = require('body-parser')

const path = require('path');

var router = require('./routers/index');

// parse application/x-www-form-urlencoded
//app.use(bodyParser.urlencoded({ extended: false }));
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use('/assets', express.static(__dirname + '/views/assets/'));

app.use(router);

app.listen( 3000, () => {
    console.log('Angular build UI tool server is running on http://localhost:3000');
})