const knex = require('../helper/knex');

const SClass = {};

SClass.create = function(student_class){
    return knex('class_student').insert(student_class);    
}
SClass.findAll = function(class_query){
    return knex.select('*').from('class_student').where(class_query)
}
SClass.findWeek = function(st_id, start, end){
    return knex('class_student')
    .join('class','class_student.class_id','=','class.id')
    .select('class_student.class_id')
    .where('class.date','>',start)
    .andWhere('class.date','<',end)
    .andWhere({'class_student.student_id':st_id});
}
SClass.find = function(query){
    return SClass.findAll(query).first();
}
SClass.remove = function(id){
    return knex('classes').where({id:id}).del();
}
SClass.put = function(id, class_body){
    return knex('classes').where({id:id}).update(class_body).first();
}

module.exports = SClass;