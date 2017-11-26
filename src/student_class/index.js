"use strict"

const express = require('express');
const route = express.Router();
const stclssControll = require('./student_class.controller');

route.post('/', stclssControll.create);

route.get('/', stclssControll.get);

route.get('/:id', stclssControll.getOne);

route.put('/:id', stclssControll.put);

route.delete('/:id', stclssControll.delete);

module.exports = route;