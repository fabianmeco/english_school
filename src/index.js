const express = require('express');
const app = express();
const body = require('body-parser');
const student = require('./student');
const clss = require('./class');
const teacher = require('./teacher');
const room = require('./room');

app.listen(3000, function(){
    console.log('example app listening on 3000');
});

app.use(body.urlencoded({extended:false}));

app.use(body.json());

app.use('/student', student);

app.use('/teacher', teacher);

app.use('/class', clss);

app.use('/rooms', room)

module.exports = app;