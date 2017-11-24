"use strict"

const roomModel = require('./room.model');
const joi = require('joi');

const schema = joi.object().keys({
    id: joi.number().integer().required(),
    name: joi.string().alphanum().required(),
    capacity: joi.number().integer().required()
});
const schema_update = joi.object().keys({
    name: joi.string().alphanum(),
    capacity: joi.number().integer()
});

exports.create = function (req, res) {
    joi.validate(req.body, schema, function (err, value) {
        if (err) {
            return res.status(422).json(err.map(function (err) {
                return { "name": err.name, "message": err.details.message }
            }));
        }
    });
    Promise.all([
        roomModel.find({ name: req.body.name }),
        roomModel.findAll()])
        .then(function (res) {
            if (res[0]) {
                return res.status(422).json([{ "name": "name", "message": "room name already registered" }])
            }
            if (res[1].lenght >= 2) {
                return res.status(422).json([{ "name": "room", "message": "max rooms reached" }]);
            }
        })
        .catch(err => res.status(500)
            .send(json([{ "name": "error", "message": err.message }]))
        );
   return roomModel.create(req.body)
        .then(newRoom => res.json(newRoom))
        .catch(err => res.status(500).send({ "name": "error", "message": err.message }));

}
exports.get = function (req, res) {
    return roomModel.findAll(req.query)
        .then(rooms => res.json(rooms))
        .catch(err => res.status(500).send({ "name": "error", "message": err.message }));
}
exports.getOneMiddleware = function (req, res, next) {
    roomModel.find(req.params.id).then(function (room) {
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
    joi.validate(req.body, schema_update, function (err, value) {
        if (err) {
            return res.status(422).json(err.map(function (err) {
                return { "name": err.name, "message": err.details.message }
            }));
        }
    });
    roomModel.find({ name: req.body.name })
        .then(function (found) {
            if (found) {
                return found.status(422).json([{ "name": "name", "message": "room name already registered" }])
            }
        })
        .catch(err => res.status(500)
            .send(json([{ "name": "error", "message": err.message }]))
        );
    roomModel.update(req.room.id, req.body)
        .then(value => res.send({"name":"updated", "message":"Room has been updated"}))
        .catch(err => res.status(500).send({ "name": "error", "message": err.message }));
}
exports.delete = function(req, res){
    return roomModel.remove(req.room.id)
    .then(value => res.send({"name":"updated", "message":"Room has been updated"}))
    .catch(err => res.status(500).send({ "name": "error", "message": err.message }));
}

