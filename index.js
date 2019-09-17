const express = require('express');
const app = express();

const path = require('path');

var router = require('./routers/index');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use('/assets', express.static(__dirname + '/views/assets/'));

app.use(router);

app.listen( 3000, () => {
    console.log('Angular build UI tool server is running on http://localhost:3000');
})