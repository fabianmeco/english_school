const express = require('express');
const app = express();
const body = require('body-parser');
const routes = require('./routes')

app.listen(3000, function(){
    console.log('example app listening on 3000');
});

app.use(body.urlencoded({extended:false}));

app.use(body.json());

app.use('/api',routes);

app.use(express.static('./views')); 

module.exports = app;