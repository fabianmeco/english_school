"use strict"

const express = require('express');
const route = express.Router();
const studentController = require('./student.controller');
const instanceRoute = express.Router();
const class_student = require('../student_class');

route.post('/', studentController.create);

route.get('/', studentController.get);

route.use('/:id', studentController.getOneMiddleware, instanceRoute);

instanceRoute.get('/', studentController.getOne);

instanceRoute.delete('/', studentController.delete);

instanceRoute.put('/', studentController.put);

instanceRoute.use('/class', class_student);

module.exports=route;
