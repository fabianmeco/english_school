const knex = require('../helper/knex');

const Room = {};

Room.create = function(room){
    return knex('rooms').insert(room);    
}
Room.findAll = function(room_query){
    return knex.select('*').from('rooms').where(room_query)
}
Room.find = function(id){
    return Room.findAll({id:id}).first();
}
Room.remove = function(id){
    return knex('rooms').where({id:id}).del();
}
Room.put = function(id, room_body){
    return knex('rooms').where({id:id}).update(room_body).first();
}

module.exports = Room;