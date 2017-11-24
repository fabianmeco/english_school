"use strict"

const express = require('express');
const route = express.Router();
const roomController = require('./room.controller');
const instanceRoute = express.Router();

route.post('/', roomController.create);

route.get('/', roomController.get);

route.use('/id', roomController.getOneMiddleware, instanceRoute);

instanceRoute.get('/', roomController.getOne);

instanceRoute.delete('/', roomController.remove);

instanceRoute.put('/', roomController.put);


module.exports=route;
