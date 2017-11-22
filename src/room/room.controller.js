"use strict"

const roomModel = require('./room.model');
const joi = require('joi');

const schema = joi.object().keys({
    name : joi.string().alphanum().required(),
    capacity: joi.number().integer().required()
});


exports.create = function(req, res){

} 
