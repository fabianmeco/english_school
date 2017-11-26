const knex = require('../helper/knex');

const Teacher = {};

Teacher.create = function(teacher){
    return knex('teachers').insert(teacher);    
}
Teacher.findAll = function(teacher_query){
    return knex.select('*').from('teachers').where(teacher_query)
}
Teacher.find = function(id){
    return Teacher.findAll({id:id}).first();
}
Teacher.remove = function(id){
    return knex('teachers').where({id:id}).del();
}

Teacher.removeAll = function(){
    return knex('teachers').del();
}

Teacher.update = function(id, teacher_body){
    return knex('teachers').where({id:id}).update(teacher_body).first();
}

module.exports = Teacher;