const knex = require('../helper/knex');

const Class = {};

Class.create = function(clss){
    return knex('classes').insert(clss);    
}
Class.findAll = function(class_query){
    return knex.select('*').from('classes').where(class_query)
}
Class.find = function(id){
    return Class.findAll({id:id}).first();
}
Class.remove = function(id){
    return knex('classes').where({id:id}).del();
}
Class.put = function(id, class_body){
    return knex('classes').where({id:id}).update(class_body).first();
}

module.exports = Class;
