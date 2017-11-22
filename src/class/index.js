"use strict"

const express = require('express');
const route = express.Router();
const classController = require('./class.controller');
const instanceRoute = express.Router();

route.post('/', classController.create);

route.get('/', classController.get);

route.use('/id', classController.getOneMiddleware, instanceRoute);

instanceRoute.get('/', classController.getOne);

instanceRoute.delete('/', classController.remove);

instanceRoute.put('/', classController.put);


module.exports=route;

