const knex = require('../helper/knex');

const Room = {};

Room.create = function(room){
    return knex('rooms').insert(room);    
}
Room.findAll = function(room_query){
    return knex.select('*').from('rooms').where(room_query)
}
Room.find = function(query){
    return Room.findAll(query).first();
}
Room.remove = function(id){
    return knex('rooms').where({id:id}).del();
}
Room.removeAll = function(){
    return knex('rooms').del();
}

Room.update = function(id, room_body){
    return knex('rooms').where({id:id}).update(room_body).first();
}

module.exports = Room;