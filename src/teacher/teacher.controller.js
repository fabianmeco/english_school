"use strict"
const teacherModel = require('./teacher.model');
const joi = require('joi');
const moment = require('moment');

const schema = joi.object().keys({
    id: joi.number().integer().required(),
    fullname: joi.string().required(),
    cid: joi.string().required(),
    birthday: joi.date().max(moment().subtract(18, 'years').format()).required(),
    phone_number: joi.string().regex(/^[0-9\-\+]{10}$/).required(),
    email: joi.string().email().required(),
    address: joi.string().required()
});
const schema_update = joi.object().keys({
    fullname: joi.string(),
    cid: joi.string(),
    birthday: joi.date().max(moment().subtract(18, 'years').format()),
    phone_number: joi.string().regex(/^[0-9\-\+]{10}$/),
    email: joi.string().email(),
    address: joi.string()
});

exports.create = function (req, res) {
    joi.validate(req.body, schema, function (err, value) {
        if (err) {           
            return res.status(422).send(err.details.map(function (error) {
                return { "name": error.context.key, "message": error.message }
            }));
        }
    });
   
    return teacherModel.find({ cid: req.body.cid })
        .then(function (found) {
            if (found) {
               return res.status(422).send({ "name": "cid", "message": "Cid already registered" });
            }
            return teacherModel.create(req.body)
            .then(newTeacher => res.json(newTeacher))
        })
        .catch(err =>res.status(500).send([{ "name": "error", "message": err.message }]));
}
exports.get = function(req, res){
    return teacherModel.findAll(req.query)
    .then(values => res.json(values))
    .catch(err => res.status(500).send({ "name": "error", "message": err.message }));
}
exports.getOneMiddleware = function(req, res, next){
    return teacherModel.find({id:req.params.id}).then(function (teacher) {
        if (teacher) {
            req.teacher = teacher;
            return next();
        }
        return res.sendStatus(404);
    }).catch(err => res.status(500).send({ "name": "error", "message": err.message }));
}
exports.getOne = function(req, res){
    return res.json(req.teacher);
}
exports.put = function(req, res){
    joi.validate(req.body, schema_update, function (err, value) {
        if (err) {            
            return res.status(422).send(err.details.map(function (error) {
                return { "name": error.context.key, "message": error.message }
            }));
        }
    });
    return teacherModel.find({ cid: req.body.cid })
        .then(function (found) {
            if (found&&(found.id!==req.teacher.id)) {         
                return res.status(422).send({ "name": "cid", "message": "Cid already registered" });
            }
            return teacherModel.update(req.teacher.id, req.body)
            .then(newTeacher => res.send({"name":"updated", "message":"Room has been updated"}))
        })
        .catch(err => res.status(500).send({ "name": "error", "message": err.message }));    
}
exports.delete = function(req, res){
    return teacherModel.remove(req.teacher.id)
    .then(newTeacher => res.json({"name":"updated", "message":"Room has been updated"}))
    .catch(err => res.status(500).send({ "name": "error", "message": err.message }));
}