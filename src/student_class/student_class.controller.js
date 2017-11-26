"use strict"

const stModel = require('./student_class.model');
const clssModel = require('../class/class.model');

exports.create = function (err, res) {
    clssModel.find({ id: req.body.clss_id }).then(function (clss) {
        if (clss) {
            let date = new Date(clss.date);
            let millisecs = date.getTime();
            let end = 6 - date.getDate();
            let ini = date.getDate() - 1;
            Promise.all([
                stModel.findWeek(req.student.id, date.setTime(millisecs - ini).toString(), date.setTime(millisecs + end).toString()),
                stModel.findAll({ class_id: req.body.clss_id, student_id: req.student.id })
            ])
                .then(function (value) {
                    if (value[0].length > 7) {
                        return res.status(422).send({ "name": "error", "message": "Max number of classes reached for a week." });
                    } if (value[1]) {
                        return res.status(422).send({ "name": "error", "message": "Student already registered in this class" });
                    }
                    return stModel.create({ student_id: req.student.id, class_id: req.body.clss_id }).then(stclss => res.json(stclss));
                });
        }
    }).catch(err => res.status(500).send(json([{ "name": "error", "message": err.message }])));
}

exports.get = function (err, res) {
    return stModel.findAll(req.query)
        .then(value => res.json(value))
        .catch(err => res.status(500).send(json([{ "name": "error", "message": err.message }])));
}

exports.getOne = function (err, res) {
    return stModel.find({ id: req.params.id })
        .then(value => res.json(value))
        .catch(err => res.status(500).send(json([{ "name": "error", "message": err.message }])));
}

exports.delete = function (err, res){
    return stModel.remove(req.params.id)
    .then(newClass => res.json({ "name": "updated", "message": "Room has been updated" }))
    .catch(err => res.status(500).send(json([{ "name": "error", "message": err.message }])))
}

exports.put = function(err, res){
    clssModel.find({ id: req.body.clss_id }).then(function (clss) {
        if (clss) {
            let date = new Date(clss.date);
            let millisecs = date.getTime();
            let end = 6 - date.getDate();
            let ini = date.getDate() - 1;
            Promise.all([
                stModel.findWeek(req.student.id, date.setTime(millisecs - ini).toString(), date.setTime(millisecs + end).toString()),
                stModel.findAll({ class_id: req.body.clss_id, student_id: req.student.id })
            ])
                .then(function (value) {
                    if (value[0].length > 7) {
                        return res.status(422).send({ "name": "error", "message": "Max number of classes reached for a week." });
                    } if (value[1]) {
                        return res.status(422).send({ "name": "error", "message": "Student already registered in this class" });
                    }
                    return stModel.put(id, req.bodi.clss_id).then(stclss => res.json(stclss));
                });
        }
    }).catch(err => res.status(500).send(json([{ "name": "error", "message": err.message }])));
}