"use strict"

const roomModel = require('./room.model');
const joi = require('joi');

const schema = joi.object().keys({
    name: joi.string().alphanum().required(),
    capacity: joi.number().integer().required()
});
const schema_update = joi.object().keys({
    name: joi.string().alphanum(),
    capacity: joi.number().integer()
});

exports.create = function (req, res) {
    joi.validate(req.body, schema)
        .then(function () {
            return Promise.all([
                roomModel.find({ name: req.body.name }),
                roomModel.findAll({})
            ])
                .then(function (result) {
                    if (result[1].length >= 5) {
                        return res.status(422).send({ "name": "room", "message": "max rooms reached" });
                    }
                    if (result[0]) {
                        console.log('room2');
                        return res.status(422).send({ "name": "name", "message": "room name already registered" })
                    }

                    return roomModel.create(req.body)
                        .then(newRoom => res.json(newRoom))
                })
        })
        .catch(err => res.status(500).send({ "name": "error", "message": err.message }));
}
exports.get = function (req, res) {
    return roomModel.findAll(req.query)
        .then(rooms => res.json(rooms))
        .catch(err => res.status(500).send({ "name": "error", "message": err.message }));
}
exports.getOneMiddleware = function (req, res, next) {
    roomModel.find({ id: req.params.id }).then(function (room) {
        if (room) {
            req.room = room;
            return next();
        }
        return res.sendStatus(404);
    }).catch(err => res.status(500).send({ "name": "error", "message": err.message }));
}
exports.getOne = function (req, res) {
    return res.json(req.room);
}
exports.put = function (req, res) {
    joi.validate(req.body, schema_update).then(function () {
        return roomModel.find({ name: req.body.name })
            .then(function (found) {
                if (found && (found.id !== req.room.id)) {
                    return res.status(422).send([{ "name": "name", "message": "room name already registered" }])
                }
                console.log('eeeee');
                return roomModel.update(req.room.id, req.body)
                    .then(value => res.send({ "name": "updated", "message": "Room has been updated" }))
            })
    })
        .catch(err => res.status(500).send({ "name": "error", "message": err.message }))

}
exports.delete = function (req, res) {
    return roomModel.remove(req.room.id)
        .then(value => res.send({ "name": "updated", "message": "Room has been updated" }))
        .catch(err => res.status(500).send({ "name": "error", "message": err.message }));
}

