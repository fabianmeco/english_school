"use strict"

const classModel = require('./class.model');
const teacherModel = require('../teacher/teacher.model');
const holidayapi = require('node-holidayapi');
const joi = require('joi');
const moment = require('moment');

const schema = joi.object().keys({
    id: joi.number().integer().required(),
    date: joi.date().min(moment().format()).required(),
    teacher_id: joi.number().integer().required(),
    room_id: joi.number().integer().required()
});

exports.create = function(req, res){
//left implementation
}

exports.get = function(req, res){
    return classModel.findAll(req.query)
    .then(values => res.json(values))
    .catch(err => res.status(500).send({ "name": "error", "message": err.message }));
}
exports.getOneMiddleware = function(req, res, next){
    classModel.find(req.params.id).then(function (clss) {
        if (clss) {
            req.clss = clss;
            return next();
        }
        return res.sendStatus(404);
    }).catch(err => res.status(500).send({ "name": "error", "message": err.message }));
}
exports.getOne = function(req, res){
    return res.json(req.clss);
}
exports.put = function(req, res){
//left implementation
}
exports.delete = function(req, res){
    return classModel.remove(req.teacher.id)
    .then(newClass => res.json({"name":"updated", "message":"Room has been updated"}))
    .catch(err => res.status(500).send({ "name": "error", "message": err.message }));
}
