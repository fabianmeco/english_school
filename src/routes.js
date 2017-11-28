const student = require('./student');
const clss = require('./class');
const teacher = require('./teacher');
const room = require('./room');
const express = require('express');
const route = express.Router();

route.use('/student', student);

route.use('/teacher', teacher);

route.use('/class', clss);

route.use('/room', room)

module.exports = route;