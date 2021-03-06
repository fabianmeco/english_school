const knex = require('../helper/knex');

const Student = {};

Student.create = function(student){
    return knex('students').insert(student);    
}
Student.findAll = function(student_query){
    return knex.select('*').from('students').where(student_query)
}
Student.find = function(query){
    return Student.findAll(query).first();
}
Student.remove = function(id){
    return knex('students').where({id:id}).del();
}
Student.removeAll = function(){
    return knex('students').del();
}
Student.put = function(id, student_body){
    return knex('students').where({id:id}).update(student_body).first();
}

module.exports = Student;