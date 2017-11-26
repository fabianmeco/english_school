"use strict"

const express = require('express');
const route = express.Router();
const teacherController = require('./teacher.controller');
const instanceRoute = express.Router();

route.post('/', teacherController.create);

route.get('/', teacherController.get);

route.use('/id', teacherController.getOneMiddleware, instanceRoute);

instanceRoute.get('/', teacherController.getOne);

instanceRoute.delete('/', teacherController.delete);

instanceRoute.put('/', teacherController.put);


module.exports=route;
