"use strict"

const classModel = require('./class.model');
const teacherModel = require('../teacher/teacher.model');
const is_empty = require('is-empty');
const roomModel = require('../room/room.model');
const holidayapi = require('node-holidayapi');
const hapi = new holidayapi('e55d8593-9d12-4a0d-b4e1-e657d622d201').v1;
const joi = require('joi');
const moment = require('moment');

const schema = joi.object().keys({
    id: joi.number().integer().required(),
    date: joi.date().min(moment().format()).required(),
    teacher_id: joi.number().integer().required(),
    room_id: joi.number().integer().required()
});
const schema_update = joi.object().keys({
    id: joi.number().integer(),
    date: joi.date().min(moment().format()),
    teacher_id: joi.number().integer(),
    room_id: joi.number().integer()
});

exports.create = function (req, res) {
    joi.validate(req.body, schema)
        .then(function () {
            let date = new Date(req.body.date);
            hapi.holidays({
                country: 'CO',
                year: date.getFullYear(),
                month: date.getMonth() + 1,
                day: date.getDay() + 1
            }, function (err, data) {
                if (err) {
                    return res.status(422).send({ "name": "error", "message": "Forbiden This is a holiday" });
                }
                if (data.holidays.length > 0) {
                    return res.status(422).send({ "name": "error", "message": "Forbiden This is a holiday" });
                }
            });

            if (parseInt(date.getDate()) === 0) {
                return res.status(422).send({ "name": "error", "message": "Classes can't be programmed on sundays" });
            }
            //validate if hour is o'clock
            //else if (parseInt(date.getMinutes()) !== 0) {
            //  return res.status(422).send({ "name": "error", "message": "Bad hour request" });
            //}
            //validate hour inside required schedule 
            let hour = parseInt(date.getHours());

            if ((hour < 7 || hour > 20) || (hour > 11 && hour < 14)) {
                return res.status(422).send({ "name": "error", "message": "Invalid hour chose ->7 ->11 or ->2 ->20" })

            }
            //validate if room and teacher exist also validates if there are not classes assigned to the same room
            Promise.all([
                classModel.findAll({ date: req.body.date, room_id: req.body.room_id }),
                classModel.findAll({ date: req.body.date, teacher_id: req.body.teacher_id }),
                teacherModel.find({ id: req.body.teacher_id }),
                roomModel.find({ id: req.body.room_id })
            ]).then(function (values) {
                if (values[0].length > 0) {
                    return res.status(422).send({ "name": "error", "message": "This date is busy" })
                }
                if (values[1].length > 0) {
                    return res.status(422).send({ "name": "error", "message": "This teacher is busy" })
                }
                if (values[2] === undefined || values[2].length === 0) {
                    return res.status(404).send({ "name": "error", "message": "This teacher is nor registered" })
                }
                if (values[3] === undefined || values[3].length === 0) {
                    return res.status(404).send({ "name": "error", "message": "This room is not registered" })
                }
                //create the class
                return classModel.create(req.body).then(clss => res.json(clss));


            })
        })
        .catch(err => res.status(500).send({ "name": "error", "message": err.message }));
}

exports.get = function (req, res) {
    let query = req.query || {};
    joi.validate(req.query, schema_update).then(function () {
        return classModel.findAll(req.query)
            .then(clss => res.json(clss))
    }).catch(err => res.status(422).send(err.details.map(function (error) {
        return { "name": error.context.key, "message": error.message }
    })))

}
exports.getOneMiddleware = function (req, res, next) {
    classModel.find(req.params.id).then(function (clss) {
        if (clss) {
            req.clss = clss;
            return next();
        }
        return res.sendStatus(404);
    }).catch(err => res.status(500).send({ "name": "error", "message": err.message }));
}
exports.getOne = function (req, res) {
    return res.json(req.clss);
}
exports.put = function (req, res) {
    joi.validate(req.body, schema_update)
        .then(function () {
            if (req.body.date) {
                let date = new Date(req.body.date);
                hapi.holidays({
                    country: 'CO',
                    year: date.getFullYear(),
                    month: date.getMonth(),//left implementation
                    day: date.getDay()
                }, function (err, data) {
                    if (data.holidays) {
                        return res.status(422).send({ "name": "error", "message": "Forbiden This is a holiday" });
                    }
                })
                if (date.getDate() === 6) {
                    return res.status(422).send({ "name": "error", "message": "Bad hour request" });
                }
                //validate if hour is o'clock
                if (date.getMinutes() !== 0) {
                    return res.status(422).send({ "name": "error", "message": "Bad hour request" });
                }

                //validate hour inside required schedule 
                let hour = date.getHours();
                if ((hour < 7 || hour > 20) || (hour > 11 && hour < 14)) {
                    return res.status(422).send({ "name": "error", "message": "Invalid hour chose ->7 ->11 or ->2 ->20" })

                }
            } //validate if room and teacher exist also validates if there are not classes assigned to the same room
            Promise.all([
                //finds a room already assigned
                classModel.findAll({ date: req.body.date, room_id: req.body.room_id || req.clss.room_id }),
                //finds if the teacher is busy at this hour
                classModel.findAll({ date: req.body.date, teacher_id: req.body.teacher_id || req.clss.teacher_id }),
                teacherModel.find(req.body.teacher_id),
                roomModel.find(req.body.room_id)
            ]).then(function (values) {
                if (values[0].length > 0) {
                    console.log('date busy');
                    return res.status(422).send({ "name": "error", "message": "This date is busy" })
                }
                if (values[1].length > 0) {
                    console.log('teacher busy');
                    return res.status(422).send({ "name": "error", "message": "This teacher is busy" })
                }
                if (!values[2]) {
                    console.log('teacher not registered');
                    return res.status(404).send({ "name": "error", "message": "This teacher is nor registered" })
                }
                if (!values[3]) {
                    console.log('room not registered');
                    return res.status(404).send({ "name": "error", "message": "This room is not registered" })
                }
                //create the class

                return classModel.update(req.clss.id, req.body).then(clss => res.send({ "name": "updated", "message": "Class has been updated" }));
            })
        })
        .catch(err => res.status(500).send({ "error": "error", "message": err.message }));
}
exports.delete = function (req, res) {
    return classModel.remove(req.clss.id)
        .then(newClass => res.json({ "name": "deleted", "message": "Room has been deleted" }))
        .catch(err => console.log(err.message));
}
