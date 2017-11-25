"use strict"

const modelStudent = require('./student.model');
const joi = require('joi');


const schema = joi.object().keys({
    id: joi.number().integer().required(),
    fullname: joi.string().required(),
    cid: joi.string().required(),
    birthday: joi.date().required(),
    phone_number: joi.string().regex(/^[0-9\-\+]{10}$/).required(),
    email: joi.string().email().required(),
    address: joi.string().required()
});

const schema_update = joi.object().keys({
    id: joi.number().integer(),
    fullname: joi.string(),
    cid: joi.string(),
    birthday: joi.date(),
    phone_number: joi.string().regex(/^[0-9\-\+]{10}$/),
    email: joi.string().email(),
    address: joi.string()
});

exports.create = function (req, res) {
    joi.validate(req.body, schema, function (err, value) {
        if (err) {
            return res.status(422).json(err.map(function (err) {
                return {"name": err.name, "message": err.details.message};
            })
            );
        }
    });
    modelStudent.find({ cid: req.body.cid })
    .then(function(found){
        if(found){
            return res.status(422).send({ "name": "cid", "message": "Cid already registered" });
        }
    }).catch(err => res.status(500).send(json([{ "name": "error", "message": err.message }])));
    return studentModel.create(req.body)
    .then(newStudent => res.json(newStudent))
    .catch(err => res.status(500).send({ "name": "error", "message": err.message }));
}
exports.get = function(req, res){
    return studentModel.findAll(req.query)
    .then(values => res.json(values))
    .catch(err => res.status(500).send({ "name": "error", "message": err.message }));
}
exports.getOneMiddleware = function(req, res, next){
    studentModel.find(req.params.id).then(function (student) {
        if (student) {
            req.student = student;
            return next();
        }
        return res.sendStatus(404);
    }).catch(err => res.status(500).send({ "name": "error", "message": err.message }));
}
exports.getOne = function(req, res){
    return res.json(req.student);
}
exports.put = function(req, res){
    joi.validate(req.body, schema_update, function (err, value) {
        if (err) {
            return res.status(422).json(err.map(function (err) {
                return { "name": err.name, "message": err.details.message }
            }));
        }
    });
    studentModel.find({ cid: req.body.cid })
        .then(function (found) {
            if (found) {
                return res.status(422).send({ "name": "cid", "message": "Cid already registered" });
            }
        })
        .catch(err => res.status(500).send(json([{ "name": "error", "message": err.message }]))
        );
    return teacherModel.update(req.teacher.id, req.body)
        .then(student => res.json({"name":"updated", "message":"Student has been updated"}))
        .catch(err => res.status(500).send({ "name": "error", "message": err.message }));
}
exports.delete = function(req, res){
    return studentModel.remove(req.student.id)
    .then(student => res.json({"name":"updated", "message":"Room has been updated"}))
    .catch(err => res.status(500).send({ "name": "error", "message": err.message }));
}

