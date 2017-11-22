
exports.up = function(knex, Promise) {
  return knex.schema.createTable('students', function(student){
    student.increments('id').primary();
    student.string('fullname').notNull();
    student.string('cid').notNull(); //cid -> Student's personal Id.
    student.dateTime('birthday').notNull();
    student.string('phone_number').notNull();
    student.string('email').notNull();
    student.string('address').notNull();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('students');
};
