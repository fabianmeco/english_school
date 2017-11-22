
exports.up = function(knex, Promise) {
  return knex.schema.createTable('class_student', function(cs){
      cs.increments('id').primary();
      cs.integer('class_id').notNull();
      cs.foreign('class_id').references('classes.id');
      cs.integer('student_id').notNull();
      cs.foreign('student_id').references('students.id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('class_student');
};
